class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :reviews, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :replies, dependent: :destroy
  has_many :book_marks, dependent: :destroy
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
