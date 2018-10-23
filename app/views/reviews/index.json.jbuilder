json.array! @reviews do |review|
  json.extract! review, :id, :food_name
  json.url review_url(review, format: :json)
end
