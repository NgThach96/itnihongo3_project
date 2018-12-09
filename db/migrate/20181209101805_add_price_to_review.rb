class AddPriceToReview < ActiveRecord::Migration[5.1]
  def change
    add_column :reviews, :price, :decimal
  end
end
