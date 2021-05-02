class Api::V1::SeasonalFoodsController < Api::V1::ApiController
  def index
  end

  def create
    @seasonalFood = SeasonalFood.new(seasonalFood_params)
    if @seasonalFood.save
      render json: @seasonalFood, status: :created
    else
      render json: { status: 400 }
    end
  end

  private
    def seasonalFood_params
      params.require(:seasonal_food).permit(:name, :category, :start_month, :end_month)
    end
end
