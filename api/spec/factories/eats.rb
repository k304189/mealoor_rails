FactoryBot.define do
  factory :eat do
    user { nil }
    eat_date { "2021-06-04" }
    eat_timing { "MyString" }
    eat_type { "MyString" }
    name { "MyString" }
    category { "MyString" }
    kcal { 1 }
    price { 1 }
    shop { "MyString" }
    discounted { false }
    amount { 1 }
    unit { "MyString" }
    note { "MyString" }
    protein { 1.5 }
  end
end
