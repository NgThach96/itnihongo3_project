class ReviewsController < ApplicationController
  autocomplete :review, :food_name, :full => true
  before_action :set_review, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /reviews
  # GET /reviews.json
  def index
    # User Will_Paginate gem
    # 5 review per page
    @reviews = Review.paginate(:page => params[:page], :per_page => 5)

    # Count number of like and dislike
    if params[:search]
      @reviews = Review.name_like(params[:search]).paginate(:page => params[:page], :per_page => 5)
    else
      @reviews = Review.paginate(:page => params[:page], :per_page => 5)
    end

    @likes = {}
    @dislikes = {}
    index = 0
    @reviews.each do |review|
      dislike = 0
      like = 0
      review.comments.each do |comment|
        if comment.emotion_type == 1
          like = like + 1
        end

        if comment.emotion_type == 0
          dislike = dislike + 1
        end
      end
      @likes[review.id] = like
      @dislikes[review.id] = dislike
    end

    # find something
    @reviews1 = Review.find([1,2,3,4])
  end


  # Control like action in home page
  def likeaction
    emotion_type = params[:emotion_type]
    type = params[:type]
    reviewId = params[:review_id]
    review = Review.find(reviewId)
    comment = review.comments.find_by(user_id: current_user.id)
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

  # GET /reviews/1
  # GET /reviews/1.json
  def show
    @review = Review.find(params[:id])
    @user_of_review = User.find_by id:@review.user_id
  end

  # GET /reviews/new
  def new
    @review = Review.new
  end

  # GET /reviews/1/edit
  def edit
  end

  # POST /reviews
  # POST /reviews.json
  def create
    @review = Review.new(review_params)

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
      params.require(:review).permit(:food_name, :store_name, :store_address, :food_picture, :taste_rate, :safety_rate, :price_rate, :user_id)
    end
end





# INSERT INTO reviews (id, title, food_name, post_content, store_name, store_address, taste_rate, safety_rate, price_rate, user_id, created_at, updated_at) VALUES ("1","Quá ngon","Xôi Hà Nội","Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la ","Xôi chả cua lạp xưởng ruốc - Xôi Bà Thảo","Số 41 Đường Thành, Hoàn Kiếm","5","4","3","1","2018-10-05 08:45:54","2018-10-05 08:45:54");
# INSERT INTO reviews (id, title, food_name, post_content, store_name, store_address, taste_rate, safety_rate, price_rate, user_id, created_at, updated_at) VALUES ("2","50% đá là mất 30% trà sữa hả ???","Trà sữa","Mình uống rất nhiều quán rồi dù uống nhiều đá hay không vẫn full ly , lần đầu tiên 50% đá mà ly mất 1 khúc luôn mới ghê , bán đá hay bán trà sữa . Không hẹn gặp lại !!!
# ","Hokkaido Tea","81 Âu Cơ, P.14, Quận 11, Thành phố Hồ Chí Minh","4","4","2","2","2017-07-04 08:45:54","2017-07-04 08:45:54");
