class SeasonalFood < ApplicationRecord
  validates :name, presence: true, length: { maximum: 30 }
  validates :category, presence: true,
                       length: { maximum: 30 }
  validates :start_month, presence: true,
                          numericality: {
                            greater_than: 0,
                            less_than: 13,
                            only_integer: true
                          }
  validates :end_month, presence: true,
                        numericality: {
                          greater_than: 0,
                          less_than: 13,
                          only_integer: true
                        }
end
