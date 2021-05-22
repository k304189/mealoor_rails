class Usage < ApplicationRecord
  belongs_to :stock, class_name: 'Stock', :foreign_key => 'stock_id'
  belongs_to :cook, class_name: 'Stock', :foreign_key => 'cook_id', optional: true
end
