class Api::V1::DailyDataController < ApplicationController
  before_action :authenticate_user!

  def index
    date = params[:date]
    eat = current_user.eats
                      .where(eat_date: date)
                      .order(:eat_timing)
    render json: { eat: eat }
  end
end
