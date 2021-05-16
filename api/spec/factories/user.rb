FactoryBot.define do
  factory :user do
    name { "RSpecテストユーザー" }
    email { "rspec_test@rspec.com" }
    password { "password" }
  end
end
