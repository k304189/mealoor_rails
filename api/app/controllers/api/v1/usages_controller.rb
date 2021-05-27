class Api::V1::UsagesController < ApplicationController
  include CommonActions
  before_action :authenticate_user!

  def history
    target_stock_id = params[:id]
    stock = current_user.stocks.find(target_stock_id)
    if stock
      @usage = Usage.where(stock_id: target_stock_id)
      render json: @usage
    else
      render json: { status: 400 }
    end
  end

  def foodstuff
    target_cook_id = params[:id]
    cook = current_user.stocks.find(target_cook_id)
    foodstuffs = []
    if cook
      usages = Usage.where(cook_id: target_cook_id)
      usages.each do |usage|
        calced_stock_param = calc_stock_param(usage.stock_id, usage.use_rate)
        foodstuffs.push(calced_stock_param)
      end
      render json: foodstuffs
    else
      render json: { status: 400 }
    end
  end
end
