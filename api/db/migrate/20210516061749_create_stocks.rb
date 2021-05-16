class CreateStocks < ActiveRecord::Migration[6.1]
  def change
    create_table :stocks do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, :null => false
      t.string :category, :null => false
      t.date :limit, :null => false
      t.integer :price, :default => 0
      t.integer :kcal, :default => 0
      t.integer :remain, :null => false, :default => 100
      t.integer :amount, :default => 0
      t.string :unit
      t.float :protein, :default => 0
      t.integer :quantity, :default => 1
      t.string :location
      t.string :stock_type
      t.string :shop
      t.boolean :discounted
      t.string :note

      t.timestamps
    end
  end
end
