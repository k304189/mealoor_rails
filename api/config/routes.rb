Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'

      get 'users/currentuser'
      resources :seasonal_foods, only: %i[index create update destroy]
      resources :stocks, only: %i[index create update]
      post "stocks/dispose"
      post "stocks/split"
      post "stocks/cook"
      get 'usages/history/:id', to: "usages#history"
      get 'usages/foodstuff/:id', to: "usages#foodstuff"
    end
  end
end
