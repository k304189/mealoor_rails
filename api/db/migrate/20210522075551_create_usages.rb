class CreateUsages < ActiveRecord::Migration[6.1]
  def change
    create_table :usages do |t|
      t.references :stock
      t.references :cook
      t.date :use_date, :null => false
      t.string :use_type, :null => false
      t.integer :use_rate, :null => false
      t.string :note

      t.timestamps
    end
    add_foreign_key :usages, :stocks, column: :stock_id
    add_foreign_key :usages, :stocks, column: :cook_id
  end
end
