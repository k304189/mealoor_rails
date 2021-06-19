class Api::V1::HealthsController < ApplicationController
  before_action :authenticate_user!

  def create
    @health = current_user.healths.new(health_add_param)
    @health.set_fat_weight
    if @health.save
      render json: @health, status: :created
    else
      render json: { status: 400 }
    end
  end

  def update
    @health = current_user.healths.find(params[:id])
    @health.attributes = health_add_param
    @health.set_fat_weight
    @health.save!
    render json: @health
  end

  def get_data_by_date
    date = params[:date]
    @health = current_user.healths.find_by(recording_date: date)

    render json: @health
  end

  private
    def health_add_param
      params.require(:health).permit(:recording_date, :weight, :fat_percent)
    end
end
