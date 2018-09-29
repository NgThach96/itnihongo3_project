require 'test_helper'

class ReviewsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @review = reviews(:one)
  end

  test "should get index" do
    get reviews_url
    assert_response :success
  end

  test "should get new" do
    get new_review_url
    assert_response :success
  end

  test "should create review" do
    assert_difference('Review.count') do
      post reviews_url, params: { review: { food_name: @review.food_name, food_picture: @review.food_picture, price_rate: @review.price_rate, safety_rate: @review.safety_rate, store_address: @review.store_address, store_name: @review.store_name, taste_rate: @review.taste_rate, user_id: @review.user_id } }
    end

    assert_redirected_to review_url(Review.last)
  end

  test "should show review" do
    get review_url(@review)
    assert_response :success
  end

  test "should get edit" do
    get edit_review_url(@review)
    assert_response :success
  end

  test "should update review" do
    patch review_url(@review), params: { review: { food_name: @review.food_name, food_picture: @review.food_picture, price_rate: @review.price_rate, safety_rate: @review.safety_rate, store_address: @review.store_address, store_name: @review.store_name, taste_rate: @review.taste_rate, user_id: @review.user_id } }
    assert_redirected_to review_url(@review)
  end

  test "should destroy review" do
    assert_difference('Review.count', -1) do
      delete review_url(@review)
    end

    assert_redirected_to reviews_url
  end
end
