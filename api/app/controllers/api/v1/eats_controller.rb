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

  def update
    @eat = current_user.eats.find(params[:id])
    @eat.update!(eat_add_param)
    render json: @eat
  end

  private
    def eat_add_param
      params.require(:eat)
            .permit(:eat_date, :eat_timing, :eat_type, :name, :category,
                    :kcal, :price, :shop, :discounted, :amount, :unit, :note,
                    :protein)
    end
end
