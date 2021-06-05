class Api::V1::CalendarsController < ApplicationController
  before_action :authenticate_user!

  def index
    # period = params.require(:period).permit(:from, :to)
    from = params[:from]
    to = params[:to]
    eat_summary = current_user.eats
                              .where(eat_date: from..to)
                              .group(:eat_date)
                              .select('eats.eat_date, sum(kcal) as kcal, sum(price) as price')
    monthly_summary = eat_summary.map { |eat| [eat.eat_date, { kcal: eat.kcal, price: eat.price }] }.to_h
    render json: monthly_summary
  end
end
