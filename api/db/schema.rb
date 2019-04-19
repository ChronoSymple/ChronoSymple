# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_02_16_112818) do

  create_table "doctors", force: :cascade do |t|
    t.integer "user_id"
  end

  create_table "g_modules", force: :cascade do |t|
    t.string "name"
    t.string "icon"
    t.string "color"
  end

  create_table "i_modules", force: :cascade do |t|
    t.integer "patient_id"
    t.integer "g_module_id"
    t.integer "doctor_id"
    t.index ["doctor_id"], name: "index_i_modules_on_doctor_id"
    t.index ["g_module_id"], name: "index_i_modules_on_g_module_id"
    t.index ["patient_id"], name: "index_i_modules_on_patient_id"
  end

  create_table "notes", force: :cascade do |t|
    t.integer "i_module_id"
    t.text "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["i_module_id"], name: "index_notes_on_i_module_id"
  end

  create_table "patients", force: :cascade do |t|
    t.integer "user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "phone_number"
    t.string "password"
    t.string "login_token"
    t.time "last_connection"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
