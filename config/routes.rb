Rails.application.routes.draw do
  Rails.application.routes.default_url_options[:host] = "localhost:3000"
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  get 'reviews/autocomplete_review_food_name'
  resources :reviews
  root 'reviews#index'

  get 'reviews/show/:id' => 'reviews#show'

  get 'stores/info/:id' => 'reviews#infostore'

  # post 'comment/create' => 'comment#create'

  # thach-nguyen
  post 'reviews/commentaction' => 'reviews#commentaction'
  post 'reviews/likeaction' => 'reviews#likeaction'
  post 'reviews/deleteCommentAct' => 'reviews#deleteCommentAct'
  post 'reviews/editCommentAct' => 'reviews#editCommentAct'
  post 'reviews/change' => 'reviews#change'
  post 'reviews/deleteReview' => 'reviews#deleteReview'

  devise_for :users, :controllers => {:registrations => "users", :passwords => "passwords"}
  devise_scope :user do
    get 'users/:id', to: 'users#show', as: 'user'
    # post 'users/change' => 'users#change'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
