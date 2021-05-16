class Stock < ApplicationRecord
  belongs_to :user
  validates :user_id, presence: true
  validates :name, presence: true, length: { maximum: 30 }
  validates :category, presence: true, length: { maximum: 30 }
  validates :limit, presence: true
  validates :shop, length: { maximum: 40 }
  validates :note, length: { maximum: 50 }
  validates :price, allow_blank: true,
                    numericality: {
                      only_integer: true,
                      greater_than_or_equal_to: 0
                    }
  validates :kcal, allow_blank: true,
                   numericality: {
                     only_integer: true,
                     greater_than_or_equal_to: 0
                   }
  validates :remain, presence: true,
                     numericality: {
                       greater_than_or_equal_to: 0,
                       less_than_or_equal_to: 100
                     }
  validates :amount, allow_blank: true,
                     numericality: {
                       only_integer: true,
                       greater_than_or_equal_to: 0
                     }
  validates :protein, allow_blank: true,
                      numericality: { greater_than_or_equal_to: 0 }
  validates :quantity, allow_blank: true,
                       numericality: {
                         only_integer: true,
                         greater_than_or_equal_to: 1
                       }
end
