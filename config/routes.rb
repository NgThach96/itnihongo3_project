Rails.application.routes.draw do
  Rails.application.routes.default_url_options[:host] = "localhost:3000"
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  get 'reviews/autocomplete_review_food_name'
  resources :reviews
  root 'reviews#index'

  get 'reviews/show/:id' => 'reviews#show'

  get 'stores/info/:id' => 'reviews#infostore'

  # post 'comment/create' => 'comment#create'

  post 'reviews/:id/create-book-mark' => 'reviews#create_book_mark', as: 'create-bookmark'
  delete 'reviews/:id/delete-bookmark' => 'reviews#delete_bookmark', as: 'delete-bookmark'
  resources :book_marks
  # thach-nguyen
  get 'search' => 'reviews#search'
  post 'reviews/commentaction' => 'reviews#commentaction'
  post 'reviews/likeaction' => 'reviews#likeaction'
  post 'reviews/deleteCommentAct' => 'reviews#deleteCommentAct'
  post 'reviews/editCommentAct' => 'reviews#editCommentAct'
  post 'reviews/change' => 'reviews#change'
  post 'reviews/deleteReview' => 'reviews#deleteReview'
  # post 'comment/replyaction' => 'comment#replyaction'
  post 'reviews/replyaction' => 'reviews#replyaction'
  post 'reviews/deleteReplyAct' => 'reviews#deleteReplyAct'
  post 'reviews/editReplyAct' => 'reviews#editReplyAct'

  devise_for :users, :controllers => {:registrations => "users", :passwords => "passwords"}
  devise_scope :user do
    get 'users/:id', to: 'users#show', as: 'user'
    # post 'users/change' => 'users#change'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
