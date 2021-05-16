require 'rails_helper'

RSpec.describe Stock, type: :model do
  context "必須項目チェック" do
    it "ユーザーが空白" do
      stock = FactoryBot.build(:stock)
      expect(stock.valid?).to eq false
    end
  end
end
