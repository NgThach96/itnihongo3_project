class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.references :store, foreign_key: true
      t.references :user, foreign_key: true
      t.string :title
      t.string :food_name
      t.text :post_content
      t.string :food_picture
      t.integer :taste_rate
      t.integer :safety_rate
      t.integer :price_rate
      t.timestamps
    end
  end
end
