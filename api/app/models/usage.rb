class Usage < ApplicationRecord
  belongs_to :stock, class_name: 'Stock', :foreign_key => 'stock_id'
  belongs_to :cook, class_name: 'Stock', :foreign_key => 'cook_id', optional: true
  validates :stock_id, presence: true
  validates :use_date, presence: true
  validates :use_type, presence: true
  validates :use_rate, presence: true,
                       numericality: {
                         greater_than_or_equal_to: 1,
                         less_than_or_equal_to: 100
                       }
  validates :note, length: { maximum: 50 }
end
