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
    use_stocks = nil
    ActiveRecord::Base.transaction do
      use_stocks = create_usage
    end
    puts use_stocks
  end

  private
    def stock_add_params
      params.require(:stock)
            .permit(:name, :category, :limit, :price, :kcal, :amount, :unit,
                    :protein, :quantity, :location, :stock_type, :shop,
                    :discounted, :note)
    end

    def create_usage
      use_stocks_param = params.require(:usage)
                              .permit(:use_type, :use_date, :note,
                                      use_stocks: [:id, :use_rate])
      use_stocks = use_stocks_param[:use_stocks]
      for use_stock in use_stocks do
        stock = current_user.stocks.find(use_stock[:id])
        usage = stock.stock_usages.new
        usage.use_date = use_stocks_param[:use_date]
        usage.use_type = use_stocks_param[:use_type]
        usage.note = use_stocks_param[:note]
        usage.use_rate = use_stock[:use_rate]

        stock.remain -= use_stock[:use_rate]
        stock.save!
        usage.save!
      end
      return use_stocks
    end
end
