require 'rails_helper'

RSpec.describe Stock, type: :model do

  before :each do
    @user = FactoryBot.create(:user)
  end

  context "正常系チェック" do
    it "全項目入力されている" do
      stock = FactoryBot.build(:stock, user_id: @user.id)
      expect(stock.valid?).to eq true
    end

    it "必須項目のみ入力されている" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id)
      expect(stock.valid?).to eq true
    end

    it "必須項目のみ入力時、デフォルト値が設定されている" do
      stock = FactoryBot.create(:stock_require, user_id: @user.id)
      expect(stock.price).to eq 0
      expect(stock.kcal).to eq 0
      expect(stock.remain).to eq 100
      expect(stock.amount).to eq 0
      expect(stock.protein).to eq 0
      expect(stock.quantity).to eq 1
    end
  end

  context "必須項目チェック" do
    it "ユーザーが空白", :skip_before do
      stock = FactoryBot.build(:stock)
      expect(stock.valid?).to eq false
    end

    it "名前が空白" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, name: "")
      expect(stock.valid?).to eq false
    end

    it "カテゴリーが空白" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, category: "")
      expect(stock.valid?).to eq false
    end

    it "賞味期限が空白" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, limit: "")
      expect(stock.valid?).to eq false
    end

    it "残量が空白" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, remain: nil)
      expect(stock.valid?).to eq false
    end
  end

  context "境界値チェック（正常系）" do
    it "名前の長さが30文字" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, name: "あ" * 30)
      expect(stock.valid?).to eq true
    end

    it "カテゴリーの長さが30文字" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, category: "あ" * 30)
      expect(stock.valid?).to eq true
    end

    it "価格が0" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, price: 0)
      expect(stock.valid?).to eq true
    end

    it "カロリーが0" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, kcal: 0)
      expect(stock.valid?).to eq true
    end

    it "残量が0" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, remain: 0)
      expect(stock.valid?).to eq true
    end

    it "残量が100" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, remain: 100)
      expect(stock.valid?).to eq true
    end

    it "量が0" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, amount: 0)
      expect(stock.valid?).to eq true
    end

    it "タンパク質が0" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, protein: 0)
      expect(stock.valid?).to eq true
    end

    it "個数が1" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, quantity: 1)
      expect(stock.valid?).to eq true
    end
  end

  context "境界値チェック（異常系）" do
    it "名前の長さが31文字" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, name: "あ" * 31)
      expect(stock.valid?).to eq false
    end

    it "カテゴリーの長さが31文字" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, category: "あ" * 31)
      expect(stock.valid?).to eq false
    end

    it "価格が-1" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, price: -1)
      expect(stock.valid?).to eq false
    end

    it "カロリーが-1" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, kcal: -1)
      expect(stock.valid?).to eq false
    end

    it "残量が-1" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, remain: -1)
      expect(stock.valid?).to eq false
    end

    it "残量が101" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, remain: 101)
      expect(stock.valid?).to eq false
    end

    it "量が-1" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, amount: -1)
      expect(stock.valid?).to eq false
    end

    it "タンパク質が-0.1" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, protein: -0.1)
      expect(stock.valid?).to eq false
    end

    it "個数が0" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, quantity: 0)
      expect(stock.valid?).to eq false
    end
  end

  context "小数値の許容チェック" do
    it "タンパク質が0.1" do
      stock = FactoryBot.build(:stock_require, user_id: @user.id, protein: 0.1)
      expect(stock.valid?).to eq true
    end
  end

end
