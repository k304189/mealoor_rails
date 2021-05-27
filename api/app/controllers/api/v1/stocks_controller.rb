class Api::V1::StocksController < ApplicationController
  before_action :authenticate_user!

  def index
    @stock = current_user.stocks.where(remain: 1..100)
    render json: @stock
  end

  def create
    @stock = current_user.stocks.new(stock_add_params)
    if @stock.save
      render json: @stock, status: :created
    else
      render json: { status: 400 }
    end
  end

  def update
    @stock = Stock.find(params[:id])
    @stock.update!(stock_add_params)
    render json: @stock
  end

  def dispose
    updated_stocks = nil
    ActiveRecord::Base.transaction do
      updated_stocks, use_rate_info = create_usage
    end
    render json: updated_stocks
  end

  def split
    updated_stocks = nil
    ActiveRecord::Base.transaction do
     updated_stocks, use_rate_info = create_usage

      for use_info in use_rate_info do
        use_rate = use_info[:use_rate]
        copy_stock = current_user.stocks.find(use_info[:id]).dup
        copy_stock.price = (copy_stock.price * use_rate / 100.to_f).ceil
        copy_stock.kcal = (copy_stock.kcal * use_rate / 100.to_f).ceil
        copy_stock.amount = (copy_stock.amount * use_rate / 100.to_f).ceil
        copy_stock.protein = BigDecimal((copy_stock.protein * use_rate / 100).to_s).ceil(1).to_f
        copy_stock.quantity = 1
        copy_stock.remain = 100
        copy_stock.save!
        updated_stocks.push(copy_stock)
      end
    end
    render json: updated_stocks
  end

  def cook
    updated_stocks = nil
    ActiveRecord::Base.transaction do
      cook_info = params.require(:usage).permit(:cook_name, :cook_category, :limit)
      cooked_stock = current_user.stocks.create(
        name: cook_info[:cook_name],
        category: cook_info[:cook_category],
        limit: cook_info[:limit],
        stock_type: "料理",
        unit: "g"
      )

      updated_stocks, use_rate_info = create_usage(cooked_stock.id)
      for use_info in use_rate_info do
        use_rate = use_info[:use_rate]
        foodstuff_stock = current_user.stocks.find(use_info[:id])
        cooked_stock.price += (foodstuff_stock.price * use_rate / 100.to_f).ceil
        cooked_stock.kcal += (foodstuff_stock.kcal * use_rate / 100.to_f).ceil
        # 単位がgのものだけは量に加算する
        if foodstuff_stock.unit == "g"
          cooked_stock.amount += (foodstuff_stock.amount * use_rate / 100.to_f).ceil
        end
        cooked_stock.protein += BigDecimal((foodstuff_stock.protein * use_rate / 100).to_s).ceil(1).to_f
      end
      cooked_stock.save!
      updated_stocks.push(cooked_stock);
    end
    render json: updated_stocks
  end

  private
    def stock_add_params
      params.require(:stock)
            .permit(:name, :category, :limit, :price, :kcal, :amount, :unit,
                    :protein, :quantity, :location, :stock_type, :shop,
                    :discounted, :note)
    end

    def create_usage(cook_id=nil)
      use_stocks_param = params.require(:usage)
                              .permit(:use_type, :use_date, :note,
                                      use_stocks: [:id, :use_rate])
      use_stocks = use_stocks_param[:use_stocks]
      stocks = []
      for use_stock in use_stocks do
        stock = current_user.stocks.find(use_stock[:id])
        usage = stock.stock_usages.new
        usage.use_date = use_stocks_param[:use_date]
        usage.use_type = use_stocks_param[:use_type]
        usage.note = use_stocks_param[:note]
        usage.use_rate = use_stock[:use_rate]
        usage.cook_id = cook_id

        stock.remain -= use_stock[:use_rate]
        stock.save!
        stocks.push(stock)
        usage.save!
      end
      return stocks, use_stocks_param[:use_stocks]
    end

end
