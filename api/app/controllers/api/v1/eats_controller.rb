class Api::V1::EatsController < ApplicationController
  before_action :authenticate_user!

  def create
    @eat = current_user.eats.new(eat_add_param)
    if @eat.save
      render json: @eat, status: :created
    else
      render json: { status: 400 }
    end
  end

  private
    def eat_add_param
      params.require(:eat)
            .permit(:eat_date, :eat_timing, :eat_type, :name, :category,
                    :kcal, :price, :shop, :discounted, :amount, :unit, :note,
                    :protein)
    end
end
