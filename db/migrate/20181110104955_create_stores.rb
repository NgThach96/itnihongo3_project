class CreateStores < ActiveRecord::Migration[5.1]
  def change
    create_table :stores do |t|
      t.string :store_name
      t.string :store_address
      t.string :open_time
      t.string :phone
      t.timestamps
    end
  end
end
