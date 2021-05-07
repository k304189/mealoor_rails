require 'rails_helper'

RSpec.describe "SeasonalFoods", type: :request do

  describe "SeasonalFood" do

    it "一覧取得" do
      get "/api/v1/seasonal_foods/"
      expect(response).to have_http_status(:success)
    end

    it "データ登録" do
      seasonal_food_params = {
        seasonal_food: {
          name: "白菜",
          category: "淡色野菜",
          start_month: 10,
          end_month: 12,
        }
      }

      expect { post "/api/v1/seasonal_foods", params: seasonal_food_params }.to change(SeasonalFood, :count).by(+1)
      expect(response).to have_http_status(:success)
    end

    it "データ更新" do
      seasonal_food = FactoryBot.create(:seasonal_food, name: "old_name")
      edit_params = {
        seasonal_food: {
          name: "new_name"
        }
      }
      patch "/api/v1/seasonal_foods/#{seasonal_food[:id]}", params: edit_params
      json = JSON.parse(response.body)

      expect(json["name"]).to eq(edit_params[:seasonal_food][:name])
      expect(response).to have_http_status(:success)
    end

    it "データ削除" do
      seasonal_food = FactoryBot.create(:seasonal_food)

      expect { delete "/api/v1/seasonal_foods/#{seasonal_food[:id]}"}.to change(SeasonalFood, :count).by(-1)
      expect(response).to have_http_status(:success)
    end

  end

end
