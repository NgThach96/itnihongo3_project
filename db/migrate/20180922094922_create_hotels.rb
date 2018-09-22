class CreateHotels < ActiveRecord::Migration[5.1]
  def change
    create_table :hotels do |t|
      t.string :hotel_name
      t.string :hotel_address
      t.string :hotel_phone_number
      t.float :hotel_price
      t.float :hotel_area
      t.float :hotel_rating
      t.integer :hotel_status
      t.integer :hotel_owner

      t.timestamps
    end
  end
end
