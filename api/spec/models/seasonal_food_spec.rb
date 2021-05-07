require 'rails_helper'

RSpec.describe SeasonalFood, type: :model do
  describe "正常系テスト" do
    it "すべての値が入力されている" do
      seasonal_food = FactoryBot.build(:seasonal_food)
      expect(seasonal_food.valid?).to eq true
    end
  end

end
