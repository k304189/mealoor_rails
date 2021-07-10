FactoryBot.define do
  factory :health do
    user { nil }
    recording_date { "2021-06-18" }
    weight { 60 }
    fat_percent { 20 }
  end

  factory :health_require, class: Health do
    user { nil }
    recording_date { "2021-06-19" }
    weight { 60 }
  end
end
