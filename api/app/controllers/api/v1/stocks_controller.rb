class Api::V1::StocksController < ApplicationController
  include CommonActions
  before_action :authenticate_user!

  def index
    @stock = current_user.stocks.where(remain: 1..100).order(:limit)
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
        target_stock_id = use_info[:id]
        calced_stock_param = calc_stock_param(target_stock_id, use_info[:use_rate])
        copy_stock = current_user.stocks.find(target_stock_id).dup
        copy_stock.price = calced_stock_param[:price]
        copy_stock.kcal = calced_stock_param[:kcal]
        copy_stock.amount = calced_stock_param[:amount]
        copy_stock.protein = calced_stock_param[:protein]
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
        calced_stock_param = calc_stock_param(use_info[:id], use_info[:use_rate])
        cooked_stock.price += calced_stock_param[:price]
        cooked_stock.kcal += calced_stock_param[:kcal]
        # 単位がgのものだけは量に加算する
        if calced_stock_param[:unit] == "g"
          cooked_stock.amount += calced_stock_param[:amount]
        end
        cooked_stock.protein += calced_stock_param[:protein]
      end
      cooked_stock.save!
      updated_stocks.push(cooked_stock);
    end
    render json: updated_stocks
  end

  def eat
    updated_stocks = nil
    ActiveRecord::Base.transaction do
      eat_info = params.require(:usage).permit(:use_date, :eat_timing, :note)
      updated_stocks, use_rate_info = create_usage

      for use_info in use_rate_info do
        target_stock_id = use_info[:id]
        calced_stock_param = calc_stock_param(target_stock_id, use_info[:use_rate])
        eat = current_user.eats.new(
          name: calced_stock_param[:name],
          category: calced_stock_param[:category],
          price: calced_stock_param[:price],
          kcal: calced_stock_param[:kcal],
          amount: calced_stock_param[:amount],
          unit: calced_stock_param[:unit],
          protein: calced_stock_param[:protein],
          shop: calced_stock_param[:shop],
          discounted: calced_stock_param[:discounted],
          eat_timing: eat_info[:eat_timing],
          eat_date: eat_info[:use_date],
          note: eat_info[:note]
        )
        if calced_stock_param[:stock_type] == "中食"
          eat.eat_type = calced_stock_param[:stock_type]
        else
          eat.eat_type = "自炊"
        end
        eat.save!
      end
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
