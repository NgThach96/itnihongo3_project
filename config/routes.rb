Rails.application.routes.draw do

  devise_for :admins
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  get 'reviews/autocomplete_review_food_name'
  resources :reviews
  root 'reviews#index'

  post 'reviews/likeaction' => 'reviews#likeaction'
  get 'reviews/show/:id' => 'reviews#show'

  post 'comment/create' => 'comment#create'

  devise_for :users, :controllers => {:registrations => "users"}

  devise_scope :user do
    get 'users/:id', to: 'users#show', as: 'user'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
