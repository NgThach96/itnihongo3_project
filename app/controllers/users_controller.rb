class UsersController < Devise::RegistrationsController
  def new
    super
  end

  def create
    # add custom create logic here
    super
  end

  def update
    super
  end

  def show
    @user = User.find(params[:id])
  end
end
