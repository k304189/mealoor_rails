FactoryBot.define do
  factory :stock do
    user { nil }
    name { "MyString" }
    category { "MyString" }
    limit { "2021-05-16" }
    price { 1 }
    kcal { 1 }
    remain { 1 }
    amount { "" }
    unit { "MyString" }
    protein { 1.5 }
    quantity { 1 }
    location { "MyString" }
    stock_type { "MyString" }
    shop { "MyString" }
    discounted { false }
    note { "MyString" }
  end
end
