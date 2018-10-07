class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :reviews, dependent: :destroy
  has_many :comments
  has_many :replies 
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
