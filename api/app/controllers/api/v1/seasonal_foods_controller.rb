class Api::V1::SeasonalFoodsController < Api::V1::ApiController
  def index
    @seasonalFood = SeasonalFood.all
    render json: @seasonalFood
  end

  def create
    @seasonalFood = SeasonalFood.new(seasonal_food_params)
    if @seasonalFood.save
      render json: @seasonalFood, status: :created
    else
      render json: { status: 400 }
    end
  end

  def update
    @seasonalFood = SeasonalFood.find(params[:id])
    @seasonalFood.update!(seasonal_food_params)
    render json: @seasonalFood
  end

  def destroy
    @seasonalFood = SeasonalFood.find(params[:id])
    @seasonalFood.destroy!
    render json: {}, status: :ok
  end

  private
    def seasonal_food_params
      params.require(:seasonal_food).permit(:name, :category, :start_month, :end_month)
    end
end
