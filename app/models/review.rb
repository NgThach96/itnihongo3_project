class Review < ApplicationRecord
	belongs_to :user
	has_many :comments
  scope :name_like, -> (name) { where("food_name like ? OR store_name like ?", "%#{name}%", "%#{name}%")}
end
