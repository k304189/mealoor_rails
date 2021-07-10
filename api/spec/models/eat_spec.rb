require 'rails_helper'

RSpec.describe Eat, type: :model do
  before :each do
    @user = FactoryBot.create(:user)
  end

  context "正常系チェック" do
    it "全項目入力されている" do
      eat = FactoryBot.build(:eat, user_id: @user.id)
      expect(eat.valid?).to eq true
    end

    it "必須項目のみ入力されている" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id)
      expect(eat.valid?).to eq true
    end

    it "必須項目のみ入力時、デフォルト値が設定されている" do
      eat = FactoryBot.create(:eat_require, user_id: @user.id)
      expect(eat.price).to eq 0
      expect(eat.kcal).to eq 0
      expect(eat.amount).to eq 0
      expect(eat.protein).to eq 0
    end
  end

  context "必須項目チェック" do
    it "ユーザーが空白", :skip_before do
      eat = FactoryBot.build(:eat)
      expect(eat.valid?).to eq false
    end

    it "名前が空白" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, name: "")
      expect(eat.valid?).to eq false
    end

    it "カテゴリーが空白" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, category: "")
      expect(eat.valid?).to eq false
    end

    it "食事日が空白" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, eat_date: nil)
      expect(eat.valid?).to eq false
    end

    it "食事タイミングが空白" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, eat_timing: nil)
      expect(eat.valid?).to eq false
    end

    it "食事タイプが空白" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, eat_type: nil)
      expect(eat.valid?).to eq false
    end
  end

  context "境界値チェック（正常系）" do
    it "名前の長さが30文字" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, name: "あ" * 30)
      expect(eat.valid?).to eq true
    end

    it "カテゴリーの長さが30文字" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, category: "あ" * 30)
      expect(eat.valid?).to eq true
    end

    it "価格が0" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, price: 0)
      expect(eat.valid?).to eq true
    end

    it "カロリーが0" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, kcal: 0)
      expect(eat.valid?).to eq true
    end

    it "量が0" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, amount: 0)
      expect(eat.valid?).to eq true
    end

    it "タンパク質が0" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, protein: 0)
      expect(eat.valid?).to eq true
    end

    it "店名の長さが40文字" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, shop: "あ" * 40)
      expect(eat.valid?).to eq true
    end

    it "一言メモの長さが50文字" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, note: "あ" * 50)
      expect(eat.valid?).to eq true
    end

  end

  context "境界値チェック（異常系）" do
    it "名前の長さが31文字" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, name: "あ" * 31)
      expect(eat.valid?).to eq false
    end

    it "カテゴリーの長さが31文字" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, category: "あ" * 31)
      expect(eat.valid?).to eq false
    end

    it "価格が-1" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, price: -1)
      expect(eat.valid?).to eq false
    end

    it "カロリーが-1" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, kcal: -1)
      expect(eat.valid?).to eq false
    end

    it "量が-1" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, amount: -1)
      expect(eat.valid?).to eq false
    end

    it "タンパク質が-0.1" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, protein: -0.1)
      expect(eat.valid?).to eq false
    end

    it "店名の長さが41文字" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, shop: "あ" * 41)
      expect(eat.valid?).to eq false
    end

    it "一言メモの長さが51文字" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, note: "あ" * 51)
      expect(eat.valid?).to eq false
    end

  end

  context "小数値の許容チェック" do
    it "タンパク質が0.1" do
      eat = FactoryBot.build(:eat_require, user_id: @user.id, protein: 0.1)
      expect(eat.valid?).to eq true
    end
  end
end
