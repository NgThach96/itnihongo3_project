Rails.application.routes.draw do
  resources :reviews
  root 'reviews#index'

  get 'reviews/show/:id' => 'reviews#show'
  post 'reviews/likeaction' => 'reviews#likeaction'

  devise_for :users, :controllers => {:registrations => "users"}

  devise_scope :user do
    get 'users/:id', to: 'users#show', as: 'user'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
