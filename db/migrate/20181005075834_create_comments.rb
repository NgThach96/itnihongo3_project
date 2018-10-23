class CreateComments < ActiveRecord::Migration[5.1]
  def self.up
    create_table :comments do |t|
      t.references :review, foreign_key: true
      t.references :user, foreign_key: true
      t.text :comment
      t.integer :emotion_type
      t.timestamps
    end
  end
   def self.down
    drop_table :comments
  end
end
