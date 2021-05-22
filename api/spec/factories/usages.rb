FactoryBot.define do
  factory :usage do
    date { "2021-05-22" }
    type { "" }
    use_rate { 1 }
    note { "MyString" }
  end
end
