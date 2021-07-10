require 'rails_helper'

RSpec.describe Usage, type: :model do

  before :each do
    @user = FactoryBot.create(:user)
    @stock = FactoryBot.create(:stock, user_id: @user.id)
  end

  context "正常系チェック" do
    it "全項目入力されている" do
      cook = FactoryBot.build(:cook, user_id: @user.id)
      usage = FactoryBot.build(:usage, stock_id: @stock.id, cook_id: cook.id)
      expect(usage.valid?).to eq true
    end

    it "必須項目のみ入力されている" do
      usage = FactoryBot.build(:usage_require, stock_id: @stock.id)
      expect(usage.valid?).to eq true
    end
  end

  context "必須項目チェック" do
    it "食材が空白", :skip_before do
      usage = FactoryBot.build(:usage)
      expect(usage.valid?).to eq false
    end

    it "使用日が空白" do
      usage = FactoryBot.build(:usage_require, stock_id: @stock.id, use_date: nil)
      expect(usage.valid?).to eq false
    end

    it "使用タイプが空白" do
      usage = FactoryBot.build(:usage_require, stock_id: @stock.id, use_type: "")
      expect(usage.valid?).to eq false
    end

    it "使用率が空白" do
      usage = FactoryBot.build(:usage_require, stock_id: @stock.id, use_rate: nil)
      expect(usage.valid?).to eq false
    end
  end

  context "境界値チェック（正常系）" do
    it "一言メモの長さが50文字" do
      usage = FactoryBot.build(:usage_require, stock_id: @stock.id, note: "あ" * 50)
      expect(usage.valid?).to eq true
    end

    it "使用率が1" do
      usage = FactoryBot.build(:usage_require, stock_id: @stock.id, use_rate: 1)
      expect(usage.valid?).to eq true
    end

    it "使用率が100" do
      usage = FactoryBot.build(:usage_require, stock_id: @stock.id, use_rate: 100)
      expect(usage.valid?).to eq true
    end

  end

  context "境界値チェック（異常系）" do
    it "一言メモの長さが51文字" do
      usage = FactoryBot.build(:usage_require, stock_id: @stock.id, note: "あ" * 51)
      expect(usage.valid?).to eq false
    end

    it "使用率が0" do
      usage = FactoryBot.build(:usage_require, stock_id: @stock.id, use_rate: 0)
      expect(usage.valid?).to eq false
    end

    it "使用率が101" do
      usage = FactoryBot.build(:usage_require, stock_id: @stock.id, use_rate: 101)
      expect(usage.valid?).to eq false
    end

  end

end
