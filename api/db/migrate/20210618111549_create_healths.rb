class CreateHealths < ActiveRecord::Migration[6.1]
  def change
    create_table :healths do |t|
      t.references :user, null: false, foreign_key: true, index: false
      t.date :recording_date, :null => false
      t.float :weight, :null => false
      t.float :fat_percent, :default => 0
      t.float :fat_weight, :default => 0

      t.timestamps
    end

    add_index :healths, [:user_id, :recording_date], unique: true
  end
end
