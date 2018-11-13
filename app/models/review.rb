class Review < ApplicationRecord
	belongs_to :user
	has_many :comments
	belongs_to :store
  scope :name_like, -> (name) { where("food_name like ? OR store_name like ?", "%#{name}%", "%#{name}%")}
end
