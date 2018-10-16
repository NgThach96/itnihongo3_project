# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[5.1]
  def self.up
    create_table :users do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at
      t.timestamps null: false

      t.string :name
      t.string :address
      t.date :birthday
      t.integer :gender
      t.string :avatar
    end

    # add_index :users, :email,                unique: true
   # add_index :users, :reset_password_token, unique: true
    # add_index :users, :confirmation_token,   unique: true
    # add_index :users, :unlock_token,         unique: true
  end

  def self.down
    drop_table :users
  end
end
