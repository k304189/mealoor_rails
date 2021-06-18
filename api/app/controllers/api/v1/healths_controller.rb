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

  private
    def health_add_param
      params.require(:health).permit(:recording_date, :weight, :fat_percent)
    end
end
