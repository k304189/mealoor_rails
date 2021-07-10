class Health < ApplicationRecord
  belongs_to :user
  validates :recording_date, presence: true, uniqueness: { scope: :user_id }
  validates :weight, presence: true,
                     numericality: { greater_than_or_equal_to: 0 }
  validates :fat_percent, allow_blank: true,
                          numericality: { greater_than_or_equal_to: 0 }
  validates :fat_weight, allow_blank: true,
                         numericality: { greater_than_or_equal_to: 0 }
  before_save do
    self.fat_weight = BigDecimal((self.weight * self.fat_percent / 100).to_s).ceil(2).to_f
  end

end
