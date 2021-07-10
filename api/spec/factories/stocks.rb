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

  factory :cook, class: Stock do
    user { nil }
    name { "お茶漬け" }
    category { "米" }
    limit { "2021-05-17" }
    price { 250 }
    kcal { 285 }
    remain { 100 }
    amount { 200 }
    unit { "g" }
    protein { 2.7 }
    quantity { 1 }
    location { "冷蔵庫" }
    stock_type { "自炊" }
    shop { "スーパー" }
    discounted { false }
    note { "昼食用" }
  end
end
