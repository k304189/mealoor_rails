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

  private
    def stock_add_params
      params.require(:stock)
            .permit(:name, :category, :limit, :price, :kcal, :amount, :unit,
                    :protein, :quantity, :location, :stock_type, :shop,
                    :discounted, :note)
    end
end
