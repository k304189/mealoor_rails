class CreateSeasonalFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :seasonal_foods do |t|
      t.string :name
      t.string :category
      t.integer :start_month
      t.integer :end_month

      t.timestamps
    end
  end
end
