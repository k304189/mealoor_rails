class CreateStocks < ActiveRecord::Migration[6.1]
  def change
    create_table :stocks do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.string :category
      t.date :limit
      t.integer :price
      t.integer :kcal
      t.integer :remain
      t.integer :amount
      t.string :unit
      t.float :protein
      t.integer :quantity
      t.string :location
      t.string :stock_type
      t.string :shop
      t.boolean :discounted
      t.string :note

      t.timestamps
    end
  end
end
