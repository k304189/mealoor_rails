require 'rails_helper'

RSpec.describe "Api::V1::Stocks", type: :request do

  describe "POST /create" do
    it "returns http success" do
      post "/api/v1/stocks/"
      expect(response).to have_http_status(:success)
    end
  end

end
