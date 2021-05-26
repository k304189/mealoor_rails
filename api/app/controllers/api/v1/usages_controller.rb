class Api::V1::UsagesController < ApplicationController
  before_action :authenticate_user!

  def history
    target_stock_id = params[:id]
    stock = current_user.stocks.find(target_stock_id)
    if stock
      @usage = Usage.where(stock_id: target_stock_id)
      render json: @usage, status: :created
    else
      render json: { status: 400 }
    end
  end

  def foodstuff
    target_cook_id = params[:id]
    stock = current_user.stocks.find(target_cook_id)
    if stock
      @foodstuff = Usage.where(cook_id: target_cook_id)
      render json: @foodstuff, status: :created
    else
      render json: { status: 400 }
    end
  end
end
