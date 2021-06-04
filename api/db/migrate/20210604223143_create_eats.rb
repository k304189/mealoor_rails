class CreateEats < ActiveRecord::Migration[6.1]
  def change
    create_table :eats do |t|
      t.references :user, null: false, foreign_key: true
      t.date :eat_date, :null => false
      t.string :eat_timing, :null => false
      t.string :eat_type, :null => false
      t.string :name, :null => false
      t.string :category, :null => false
      t.integer :kcal, :default => 0
      t.integer :price, :default => 0
      t.string :shop
      t.boolean :discounted
      t.integer :amount, :default => 0
      t.string :unit
      t.string :note
      t.float :protein, :default => 0

      t.timestamps
    end
  end
end
