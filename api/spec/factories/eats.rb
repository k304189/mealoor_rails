FactoryBot.define do
  factory :eat do
    user { nil }
    eat_date { "2021-06-04" }
    eat_timing { "昼食" }
    eat_type { "外食" }
    name { "牛丼" }
    category { "米" }
    kcal { 1000 }
    price { 520 }
    shop { "吉野家" }
    discounted { false }
    amount { 320 }
    unit { "g" }
    note { "出張先の昼食" }
    protein { 12.4 }
  end

  factory :eat_require, class: Eat do
    user { nil }
    name { "ペペロンチーノ" }
    category { "麺" }
    eat_date { "2021-06-05" }
    eat_timing { "夕食" }
    eat_type { "中食" }
  end
end
