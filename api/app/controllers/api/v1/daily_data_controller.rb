class Api::V1::DailyDataController < ApplicationController
  before_action :authenticate_user!

  def index
    date = params[:date]
    eat = current_user.eats
                      .where(eat_date: date)
                      .order(Arel.sql("FIELD(eat_timing, '朝食', '昼食', '夕食', '間食')"))

    eat_summary = current_user.eats
                              .where(eat_date: date)
                              .group(:eat_timing)
                              .select('eats.eat_timing as eat_timing, sum(eats.kcal) as kcal, sum(eats.price) as price')
                              .map{ |p| p.attributes }

    health = current_user.healths.find_by(recording_date: date)

    dailydata = {
      "eat" => eat,
      "health" => health,
      "summary" => {
        "breakfast" => eat_summary.find { |x| x["eat_timing"] == "朝食" },
        "lunch" => eat_summary.find { |x| x["eat_timing"] == "昼食" },
        "dinner" => eat_summary.find { |x| x["eat_timing"] == "夕食" },
        "snack" => eat_summary.find { |x| x["eat_timing"] == "間食" },
      },
    }
        
    render json: dailydata
  end
end
