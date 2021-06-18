class Health < ApplicationRecord
  belongs_to :user

  def set_fat_weight
    self.fat_weight = BigDecimal((self.weight * self.fat_percent / 100).to_s).ceil(2).to_f
  end
end
