require 'rails_helper'

RSpec.describe "Api::V1::Usages", type: :request do

  describe "GET /history" do
    it "returns http success" do
      get "/api/v1/usages/history"
      expect(response).to have_http_status(:success)
    end
  end

end
