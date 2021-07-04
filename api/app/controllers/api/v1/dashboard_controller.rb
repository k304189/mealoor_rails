class Api::V1::DashboardController < ApplicationController
  def index
    today = Time.zone.now.to_date
    yesterday = today.yesterday

    healths = current_user.healths.where(recording_date: yesterday..today)
                                  .map{ |p| p.attributes }

    eats = current_user.eats.where(eat_date: yesterday..today)
                           .group(:eat_date)
                           .select('eats.eat_date as date, sum(eats.kcal) as kcal, sum(eats.price) as price')
                           .map{ |p| p.attributes }

    stocks = current_user.stocks.where(limit: today..today.since(2.days))

    this_month_seasonalfood = SeasonalFood.where("#{today.month} between start_month and end_month")

    vegetables = this_month_seasonalfood.where(
      "category in ('緑黄色野菜', '淡色野菜', 'きのこ', '大豆', 'いも')"
    )
    vegetable = vegetables.find(vegetables.pluck(:id).sample)

    fruits = this_month_seasonalfood.where("category = 'フルーツ'")
    fruit = fruits.find(fruits.pluck(:id).sample)

    seafoods = this_month_seasonalfood.where("category in ('魚介', '海藻')")
    seafood = seafoods.find(seafoods.pluck(:id).sample)

    dashboard_data = {
      "today" => {
        "health" => healths.find { |x| x["recording_date"] == today },
        "eat" => eats.find { |x| x["date"] == today },
      },
      "yesterday" => {
        "health" => healths.find { |x| x["recording_date"] == yesterday },
        "eat" => eats.find { |x| x["date"] == yesterday },
      },
      "seasonalfood" => {
        "vegetable" => vegetable,
        "fruit" => fruit,
        "seafood" => seafood,
      },
      "stock" => stocks,
    }

    render json: dashboard_data
  end
end
