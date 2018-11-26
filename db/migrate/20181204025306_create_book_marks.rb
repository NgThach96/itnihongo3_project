class CreateBookMarks < ActiveRecord::Migration[5.1]
  def change
    create_table :book_marks do |t|
      t.integer :review_id
      t.integer :user_id
    end
  end
end
