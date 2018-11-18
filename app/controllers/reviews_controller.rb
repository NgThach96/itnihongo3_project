class ReviewsController < ApplicationController
  # autocomplete :review, :food_name, :full => true
  before_action :set_review, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  def autocomplete_review_food_name
    term = params[:term]
    food_name = params[:food_name]
    store_name = params[:store_name]
    reviews = Review.where('food_name LIKE ? OR store_name LIKE ?', "%#{term}%", "%#{term}%")
    render :json => reviews.map { |review| {:id => review.id, :label => review.food_name, :value => review.food_name} }
  end
  # GET /reviews
  # GET /reviews.json
  def index
    # User Will_Paginate gem
    # 5 review per page
    @review = Review.new
    @reviews = Review.paginate(:page => params[:page], :per_page => 5)

    # Count number of like and dislike
    if params[:review_name]
      @reviews = Review.name_like(params[:review_name]).paginate(:page => params[:page], :per_page => 5)
    else
      @reviews = Review.paginate(:page => params[:page], :per_page => 5)
    end

    @likes = {}
    @dislikes = {}
    @nums = {}
    index = 0
    @reviews.each do |review|
      dislike = 0
      like = 0
      num = 0
      review.comments.each do |comment|
        if comment.emotion_type == 1
          like = like + 1
        end

        if comment.emotion_type == 0
          dislike = dislike + 1
        end
        if comment.emotion_type == -2
          num = num + 1
        end
      end
      @nums[review.id] = num
      @likes[review.id] = like
      @dislikes[review.id] = dislike
    end

    # find something
    # @reviews1 = Review.find([1,2,3,4])
  end


  # Control like action in home page
  def likeaction
    emotion_type = params[:emotion_type]
    type = params[:type]
    reviewId = params[:review_id]
    review = Review.find(reviewId)
    comment = review.comments.where("emotion_type != -2").find_by(user_id: current_user.id)
    case params[:emotion_type]
    # 1 means user click like button
    # 0 means user click dislike button
    when "1"
      # type 1 means people click like else people unlike that
      if type == "1"
        if comment == nil
          newCom = review.comments.new
          newCom.user_id = current_user.id
          newCom.emotion_type = 1
          newCom.save
        else
          comment.emotion_type = 1
          comment.save
        end
      else
          comment.emotion_type = -1
          comment.save
      end
    when "0"
      if type == "1"
        if comment == nil
          newCom = review.comments.new
          newCom.user_id = current_user.id
          newCom.emotion_type = 0
          newCom.save
        else
          comment.emotion_type = 0
          comment.save
        end
      else
          comment.emotion_type = -1
          comment.save
      end
    end
  end

  def editCommentAct
    comment_id = params[:commentId]
    comment = params[:comment]
    target = Comment.find(comment_id)
    target.comment = comment
    target.save
  end

  def change
    @target = User.find(current_user.id)
    if params[:name]!=" "
      @name = params[:name]
      @target.name = @name
      @target.save()
    end
    if params[:email]!=" "
      @email = params[:email]
      @target.email = @email
      @target.save()
    end
    if params[:address]!=" "
      @address = params[:address]
      @target.address = @address
      @target.save()
    end
    if params[:birthday]!=" "
      @birthday = params[:birthday]
      @target.birthday = @birthday
      @target.save()
    end
    if params[:gender]!=" "
      @gender = params[:gender]
      @target.gender = @gender
      @target.save()
    end
    
    
    
    
   
    @target.save()
    redirect_back(fallback_location: root_path)
  end

  def deleteCommentAct
    comment_id = params[:commentId]
    comment = Comment.find(comment_id)
    comment.delete
  end

  def deleteReview
    review_id = params[:reviewId]
    review = Review.find(review_id)
    review.delete
  end

  # GET /reviews/1
  # GET /reviews/1.json
  def show
    @review = Review.find(params[:id])
    @user_of_review = User.find_by id:@review.user_id
    # @comment = @review.comments
  end

  def infostore
    @review = Review.find(params[:id])
    @store_of_review = Store.find_by id:@review.store_id
  end

  # GET /reviews/new
  def new
    @review = Review.new
  end

  def commentaction
    content = params[:content]
    review_id = params[:review_id]
    review = Review.find(review_id)
    newCom = review.comments.new
    newCom.user_id = current_user.id
    newCom.emotion_type = -2
    newCom.review_id = review_id
    newCom.comment = content
    newCom.save
  end

  # GET /reviews/1/edit
  def edit
  end

  # POST /reviews
  # POST /reviews.json
  def create
    @review = Review.new(review_params)
    @review.user_id = current_user.id

    respond_to do |format|
      if @review.save
        format.html { redirect_to @review, notice: 'Review was successfully created.' }
        format.json { render :show, status: :created, location: @review }
      else
        format.html { render :new }
        format.json { render json: @review.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /reviews/1
  # PATCH/PUT /reviews/1.json
  def update
    respond_to do |format|
      if @review.update(review_params)
        format.html { redirect_to @review, notice: 'Review was successfully updated.' }
        format.json { render :show, status: :ok, location: @review }
      else
        format.html { render :edit }
        format.json { render json: @review.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reviews/1
  # DELETE /reviews/1.json
  def destroy
    @review.destroy
    respond_to do |format|
      format.html { redirect_to reviews_url, notice: 'Review was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_review
      @review = Review.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def review_params
      params.require(:review).permit(:food_name, :title, :post_content, :store_id, :food_picture, :taste_rate, :safety_rate, :price_rate, :user_id)
    end
end





