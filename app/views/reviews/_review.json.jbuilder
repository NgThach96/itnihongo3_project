json.extract! review, :id, :food_name, :store_name, :store_address, :food_picture, :taste_rate, :safety_rate, :price_rate, :user_id, :created_at, :updated_at
json.url review_url(review, format: :json)
