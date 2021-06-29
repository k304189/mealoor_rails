class Api::V1::GraphController < ApplicationController
  before_action :authenticate_user!

  def index
    to = Date.parse(params[:to])
    health_param = params[:health]
    eat_param = params[:eat]
    from = to - 30

    monthly_health = current_user.healths.where(recording_date: from..to)
                                 .map{ |p| p.attributes }

    monthly_eat = current_user.eats.where(eat_date: from..to)
                                   .group(:eat_date, :eat_timing)
                                   .select('eats.eat_date as date, eats.eat_timing as eat_timing, sum(kcal) as kcal, sum(price) as price')
                                   .map{ |p| p.attributes }

    labels = []
    health_data = []
    breakfast_data = []
    lunch_data = []
    dinner_data = []
    snack_data = []

    (from..to).each do |date|
      breakfast = monthly_eat.find { |x| x["date"] == date && x["eat_timing"] == "朝食" }
      lunch = monthly_eat.find { |x| x["date"] == date && x["eat_timing"] == "昼食" }
      dinner = monthly_eat.find { |x| x["date"] == date && x["eat_timing"] == "夕食" }
      snack = monthly_eat.find { |x| x["date"] == date && x["eat_timing"] == "間食" }
      health = monthly_health.find { |x| x["recording_date"] == date }

      breakfast_data.push(breakfast.blank? ? nil : breakfast[eat_param])
      lunch_data.push(lunch.blank? ? nil : lunch[eat_param])
      dinner_data.push(dinner.blank? ? nil :  dinner[eat_param])
      snack_data.push(snack.blank? ? nil : snack[eat_param])

      health_data.push(health.blank? ? nil : health[health_param])

      labels.push(date)
    end

    graph_data = {
      "labels" => labels,
      "health" => health_data,
      "eat" => {
        "breakfast" => breakfast_data,
        "lunch" => lunch_data,
        "dinner" => dinner_data,
        "snack" => snack_data,
      }
    }

    render json: graph_data
  end
end
