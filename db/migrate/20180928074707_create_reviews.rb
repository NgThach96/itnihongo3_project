class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.string :food_name
      t.string :store_name
      t.string :store_address
      t.string :food_picture
      t.integer :taste_rate
      t.integer :safety_rate
      t.integer :price_rate
      t.integer :user_id

      t.timestamps
    end
  end
end
