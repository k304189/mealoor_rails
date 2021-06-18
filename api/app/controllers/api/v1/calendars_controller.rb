class Api::V1::CalendarsController < ApplicationController
  before_action :authenticate_user!

  def index
    # period = params.require(:period).permit(:from, :to)
    from = Date.parse(params[:from])
    to = Date.parse(params[:to])
    eat_summary = current_user.eats
                              .where(eat_date: from..to)
                              .group(:eat_date)
                              .select('eats.eat_date as date, sum(kcal) as kcal, sum(price) as price')
                              .map{ |p| p.attributes }

    healths = current_user.healths.where(recording_date: from..to).map{ |p| p.attributes }

    monthly_summary = []
    (from..to).each do |date|
      summary = {}
      eat = eat_summary.find { |x| x["date"] == date }
      health = healths.find { |x| x["recording_date"] == date }

      if eat.present?
        summary["date"] = date
        summary["kcal"] = eat["kcal"]
        summary["price"] = eat["price"]
      end

      if health.present?
        summary["date"] = date
        summary["weight"] = health["weight"]
        summary["fat_percent"] = health["fat_percent"]
      end

      if summary.present?
        monthly_summary.push(summary)
      end

    end
    render json: monthly_summary
  end
end
