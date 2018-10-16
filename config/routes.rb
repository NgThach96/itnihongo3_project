Rails.application.routes.draw do
  root 'reviews#index'

  get 'reviews/show/:id' => 'reviews#show'
  post 'reviews/likeaction' => 'reviews#likeaction'
  get 'reviews/autocomplete_review_food_name'
  resources :reviews

  post 'comment/store' => 'comment#store'

  devise_for :users, :controllers => {:registrations => "users"}

  devise_scope :user do
    get 'users/:id', to: 'users#show', as: 'user'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
