class CreateReplies < ActiveRecord::Migration[5.1]
  def self.up
    create_table :replies do |t|
      t.references :comment, foreign_key: true
      t.references :user, foreign_key: true
      t.text :reply
      t.integer :emotion_type	
      t.timestamps
    end
  end

  def self.down
  	drop_table :replies
  end
end
