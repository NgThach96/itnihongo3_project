class ReviewsController < ApplicationController
  # autocomplete :review, :food_name, :full => true
  before_action :set_review, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  def search
    @search_text = params[:search_text]
    @reviews = Review.where('food_name LIKE ?', "%#{@search_text}%").paginate(:page => params[:page], :per_page => 5)
    @count = @reviews.count
  end

  def autocomplete_review_food_name
    term = params[:term]
    food_name = params[:food_name]
    reviews = Review.where('food_name LIKE ?', "%#{term}%")
    render :json => reviews.map { |review| {:id => review.id, :label => review.food_name, :value => review.food_name, :url => review.food_picture, :title => review.title} }
  end
  # GET /reviews
  # GET /reviews.json
  def index
    # User Will_Paginate gem
    # 5 review per page
    @review_love = Comment.select("review_id, count(emotion_type) as count_like").where("emotion_type = 1").group("review_id").order("count_like DESC")
    @count0 = @review_love[0].count_like
    @count1 = @review_love[1].count_like
    @count2 = @review_love[2].count_like
    @count3 = @review_love[3].count_like
    @rev0 = Review.find(@review_love[0].review_id)
    @rev1 = Review.find(@review_love[1].review_id)
    @rev2 = Review.find(@review_love[2].review_id)
    @rev3 = Review.find(@review_love[3].review_id)


    # --------------------------------
    # most recent reviews 
    @arr = Array.new
    @review_all = Review.order("created_at DESC")
    @arr.push @review_all[0]
    @arr.push @review_all[1]
    @arr.push @review_all[2]
    @arr.push @review_all[3]

    # ---------------------------------
    #

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

    target = User.find(current_user.id)
    name = params[:name]
    if name != ""
        target.name = name
    end

    email = params[:email]
    if email != ""
        target.email = email
    end

    address = params[:address]
    if address != ""
        target.address = address
    end

    birthday = params[:birthday]
    if birthday != ""
        target.birthday = birthday
    end

    gender = params[:gender]
    if gender != ""
        target.gender = gender
    end

    target.save()
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
    review.destroy
  end

  # GET /reviews/1
  # GET /reviews/1.json
  def show
    @review = Review.find(params[:id])
    @user_of_review = User.find_by id:@review.user_id
    @review_love = Comment.select("review_id, count(emotion_type) as count_like").where("emotion_type = 1").group("review_id").order("count_like DESC")
    @count0 = @review_love[0].count_like
    @count1 = @review_love[1].count_like
    @count2 = @review_love[2].count_like
    @count3 = @review_love[3].count_like
    @rev0 = Review.find(@review_love[0].review_id)
    @rev1 = Review.find(@review_love[1].review_id)
    @rev2 = Review.find(@review_love[2].review_id)
    @rev3 = Review.find(@review_love[3].review_id)


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

  def create_book_mark
    @bookmark = BookMark.new
    @bookmark.review_id = params[:id]
    @bookmark.user_id = current_user.id
    if @bookmark.save
      redirect_to root_path
    end
  end

  def delete_bookmark
    @bookmark = BookMark.where(review_id: params[:id]).where(user_id: current_user.id).first
    if @bookmark.destroy
      redirect_to root_path
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
