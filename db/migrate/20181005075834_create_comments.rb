class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.integer :post_id, null: false
      t.integer :user_id, null: false
      t.string :comment
      t.integer :emotion_type
      t.timestamps
    end
  end
end
