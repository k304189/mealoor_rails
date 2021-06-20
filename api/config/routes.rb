Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      get 'users/currentuser'
      resources :users, only: %i[index show]
      resources :seasonal_foods, only: %i[index create update destroy]
      resources :stocks, only: %i[index create update]
      post "stocks/dispose"
      post "stocks/split"
      post "stocks/cook"
      get 'usages/history/:id', to: "usages#history"
      get 'usages/foodstuff/:id', to: "usages#foodstuff"
      resources :eats, only: %i[create update destroy]
      resources :calendars, only: %i[index]
      resources :healths, only: %i[create update]
      get 'healths/get_data_by_date/:date', to: "healths#get_data_by_date"
      get 'daily_data/:date', to: "daily_data#index"
    end
  end
end
