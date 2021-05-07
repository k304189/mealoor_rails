FactoryBot.define do
  factory :seasonal_food do
    name { "にんじん" }
    category { "緑黄色野菜" }
    start_month { 9 }
    end_month { 11 }
  end
end
