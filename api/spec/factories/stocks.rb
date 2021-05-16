FactoryBot.define do
  factory :stock do
    user { nil }
    name { "おにぎり" }
    category { "米" }
    limit { "2021-05-16" }
    price { 100 }
    kcal { 250 }
    remain { 100 }
    amount { 150 }
    unit { "g" }
    protein { 1.5 }
    quantity { 1 }
    location { "冷蔵庫" }
    stock_type { "中食" }
    shop { "スーパー" }
    discounted { false }
    note { "昼食用" }
  end

  factory :stock_require, class: Stock do
    user { nil }
    name { "フランスパン" }
    category { "パン" }
    limit { "2021-06-20" }
    remain { 100 }
  end
end
