FactoryBot.define do
  factory :usage do
    stock { nil }
    cook { nil }
    use_date { "2021-05-17" }
    use_type { "料理" }
    use_rate { 100 }
    note { "お茶漬けに料理" }
  end

  factory :usage_require, class: Usage do
    stock { nil }
    cook { nil }
    use_date { "2021-05-17" }
    use_type { "料理" }
    use_rate { 100 }
  end
end
