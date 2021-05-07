require 'rails_helper'

RSpec.describe SeasonalFood, type: :model do
  describe "正常系テスト" do
    it "すべての値が入力されている" do
      seasonal_food = FactoryBot.build(:seasonal_food)
      expect(seasonal_food.valid?).to eq true
    end
  end

  describe "必須項目チェック" do
    it "名前が空白" do
      seasonal_food = FactoryBot.build(:seasonal_food, name: "")
      expect(seasonal_food.valid?).to eq false
    end

    it "カテゴリーが空白" do
      seasonal_food = FactoryBot.build(:seasonal_food, category: "")
      expect(seasonal_food.valid?).to eq false
    end

    it "開始月が空白" do
      seasonal_food = FactoryBot.build(:seasonal_food, start_month: nil)
      expect(seasonal_food.valid?).to eq false
    end

    it "終了月が空白" do
      seasonal_food = FactoryBot.build(:seasonal_food, end_month: nil)
      expect(seasonal_food.valid?).to eq false
    end
  end

  describe "境界値チェック" do
    it "名前の長さが30文字" do
      seasonal_food = FactoryBot.build(:seasonal_food, name: "a" * 30)
      expect(seasonal_food.valid?).to eq true
    end

    it "名前の長さが31文字" do
      seasonal_food = FactoryBot.build(:seasonal_food, name: "a" * 31)
      expect(seasonal_food.valid?).to eq false
    end

    it "カテゴリーの長さが30文字" do
      seasonal_food = FactoryBot.build(:seasonal_food, category: "a" * 30)
      expect(seasonal_food.valid?).to eq true
    end

    it "カテゴリーの長さが31文字" do
      seasonal_food = FactoryBot.build(:seasonal_food, category: "a" * 31)
      expect(seasonal_food.valid?).to eq false
    end

    it "開始月の値が1（下限）" do
      seasonal_food = FactoryBot.build(:seasonal_food, start_month: 1)
      expect(seasonal_food.valid?).to eq true
    end

    it "開始月の値が0（下限）" do
      seasonal_food = FactoryBot.build(:seasonal_food, start_month: 0)
      expect(seasonal_food.valid?).to eq false
    end

    it "開始月の値が12（上限）" do
      seasonal_food = FactoryBot.build(:seasonal_food, start_month: 12)
      expect(seasonal_food.valid?).to eq true
    end

    it "開始月の値が13（上限）" do
      seasonal_food = FactoryBot.build(:seasonal_food, start_month: 13)
      expect(seasonal_food.valid?).to eq false
    end

    it "終了月の値が1（下限）" do
      seasonal_food = FactoryBot.build(:seasonal_food, end_month: 1)
      expect(seasonal_food.valid?).to eq true
    end

    it "終了月の値が0（下限）" do
      seasonal_food = FactoryBot.build(:seasonal_food, end_month: 0)
      expect(seasonal_food.valid?).to eq false
    end

    it "終了月の値が12（上限）" do
      seasonal_food = FactoryBot.build(:seasonal_food, end_month: 12)
      expect(seasonal_food.valid?).to eq true
    end

    it "終了月の値が13（上限）" do
      seasonal_food = FactoryBot.build(:seasonal_food, end_month: 13)
      expect(seasonal_food.valid?).to eq false
    end
  end

  describe "開始月・終了月の小数チェック" do
    it "開始月の値が小数" do
      seasonal_food = FactoryBot.build(:seasonal_food, end_month: 0.1)
      expect(seasonal_food.valid?).to eq false
    end

    it "終了月の値が小数" do
      seasonal_food = FactoryBot.build(:seasonal_food, end_month: 0.1)
      expect(seasonal_food.valid?).to eq false
    end
  end

end
