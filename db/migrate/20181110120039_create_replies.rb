class CreateReplies < ActiveRecord::Migration[5.1]
  def change
    create_table :replies do |t|
      t.references :comment, foreign_key: true
      t.references :user, foreign_key: true
      t.text :reply
      t.integer :emotion_type
      t.timestamps
    end
  end
end
