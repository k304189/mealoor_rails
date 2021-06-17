class Api::V1::DailyDataController < ApplicationController
  before_action :authenticate_user!

  def index
    date = params[:date]
    eat = current_user.eats
                      .where(eat_date: date)
                      .order(Arel.sql("FIELD(eat_timing, '朝食', '昼食', '夕食', '間食')"))
    render json: { eat: eat }
  end
end
