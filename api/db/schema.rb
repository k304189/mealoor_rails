# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_06_04_223143) do

  create_table "eats", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.date "eat_date", null: false
    t.string "eat_timing", null: false
    t.string "eat_type", null: false
    t.string "name", null: false
    t.string "category", null: false
    t.integer "kcal", default: 0
    t.integer "price", default: 0
    t.string "shop"
    t.boolean "discounted"
    t.integer "amount", default: 0
    t.string "unit"
    t.string "note"
    t.float "protein", default: 0.0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_eats_on_user_id"
  end

  create_table "seasonal_foods", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "category"
    t.integer "start_month"
    t.integer "end_month"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "stocks", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.string "category", null: false
    t.date "limit", null: false
    t.integer "price", default: 0
    t.integer "kcal", default: 0
    t.integer "remain", default: 100, null: false
    t.integer "amount", default: 0
    t.string "unit"
    t.float "protein", default: 0.0
    t.integer "quantity", default: 1
    t.string "location"
    t.string "stock_type"
    t.string "shop"
    t.boolean "discounted"
    t.string "note"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_stocks_on_user_id"
  end

  create_table "usages", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "stock_id"
    t.bigint "cook_id"
    t.date "use_date", null: false
    t.string "use_type", null: false
    t.integer "use_rate", null: false
    t.string "note"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["cook_id"], name: "index_usages_on_cook_id"
    t.index ["stock_id"], name: "index_usages_on_stock_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.text "tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "eats", "users"
  add_foreign_key "stocks", "users"
  add_foreign_key "usages", "stocks"
  add_foreign_key "usages", "stocks", column: "cook_id"
end
