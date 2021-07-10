require 'rails_helper'

RSpec.describe Health, type: :model do

  before :each do
    @user = FactoryBot.create(:user)
  end

  context "正常系チェック" do
    it "全項目入力されている" do
      health = FactoryBot.build(:health, user_id: @user.id)
      expect(health.valid?).to eq true
    end

    it "必須項目のみ入力されている" do
      health = FactoryBot.build(:health_require, user_id: @user.id)
      expect(health.valid?).to eq true
    end

    it "必須項目のみ入力時、デフォルト値が設定されている" do
      health = FactoryBot.build(:health_require, user_id: @user.id)
      expect(health.fat_percent).to eq 0
      expect(health.fat_weight).to eq 0
    end

    it "データ登録時、体脂肪量が自動で計算されてセットされている" do
      weight = 62.3
      fat_percent = 21.25
      health = FactoryBot.create(:health, user_id: @user.id, weight: weight, fat_percent: fat_percent)
      expect(health.fat_weight).to eq BigDecimal((weight * fat_percent / 100).to_s).ceil(2).to_f
      expect(health.fat_weight).not_to eq BigDecimal((weight * fat_percent / 100).to_s).floor(2).to_f
    end

    it "別ユーザーであれば、同じ日のデータを登録できる" do
      john = FactoryBot.create(:john)
      user_health = FactoryBot.create(:health, user_id: @user.id)
      john_health = FactoryBot.build(:health, user_id: john.id)
      expect(john_health.valid?).to eq true
    end
  end

  context "異常系チェック" do
    it "別ユーザーであれば、同じ日のデータを登録できる" do
      user_health1 = FactoryBot.create(:health, user_id: @user.id)
      user_health2 = FactoryBot.build(:health, user_id: @user.id, weight: 62)
      expect(user_health2.valid?).to eq false
    end
  end

  context "必須項目チェック" do
    it "ユーザーが空白", :skip_before do
      health = FactoryBot.build(:health)
      expect(health.valid?).to eq false
    end

    it "記録日が空白" do
      health = FactoryBot.build(:health_require, user_id: @user.id, recording_date: nil)
      expect(health.valid?).to eq false
    end

    it "記録日が空白" do
      health = FactoryBot.build(:health_require, user_id: @user.id, recording_date: nil)
      expect(health.valid?).to eq false
    end
  end

  context "境界値チェック（正常系）" do
    it "体重が0" do
      health = FactoryBot.build(:health, user_id: @user.id, weight: 0)
      expect(health.valid?).to eq true
    end

    it "体脂肪率が0" do
      health = FactoryBot.build(:health, user_id: @user.id, fat_percent: 0)
      expect(health.valid?).to eq true
    end

    it "体脂肪量が0" do
      health = FactoryBot.build(:health, user_id: @user.id, fat_weight: 0)
      expect(health.valid?).to eq true
    end
  end

  context "境界値チェック（異常系）" do
    it "体重が-1" do
      health = FactoryBot.build(:health, user_id: @user.id, weight: 0)
      expect(health.valid?).to eq true
    end

    it "体脂肪率が-1" do
      health = FactoryBot.build(:health, user_id: @user.id, fat_percent: 0)
      expect(health.valid?).to eq true
    end

    it "体脂肪量が-1" do
      health = FactoryBot.build(:health, user_id: @user.id, fat_weight: 0)
      expect(health.valid?).to eq true
    end
  end

end
