require 'rails_helper'

RSpec.describe "SeasonalFoods", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/seasonal_foods/index"
      expect(response).to have_http_status(:success)
    end
  end

end
