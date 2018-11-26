class Review < ApplicationRecord
	belongs_to :user
	has_many :comments, dependent: :destroy 
	has_many :book_marks, dependent: :destroy 
	belongs_to :store
  mount_uploader :food_picture, ImageUploader
  scope :name_like, -> (name) { where("food_name like ?", "%#{name}%")}
end
