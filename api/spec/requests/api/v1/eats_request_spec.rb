require 'rails_helper'

RSpec.describe "Api::V1::Eats", type: :request do

  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/eats/create"
      expect(response).to have_http_status(:success)
    end
  end

end
