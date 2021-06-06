class Api::V1::CalendarsController < ApplicationController
  before_action :authenticate_user!

  def index
    # period = params.require(:period).permit(:from, :to)
    from = params[:from]
    to = params[:to]
    eat_summary = current_user.eats
                              .where(eat_date: from..to)
                              .group(:eat_date)
                              .select('eats.eat_date as date, sum(kcal) as kcal, sum(price) as price')
    render json: eat_summary
  end
end
