class UsersController < Devise::RegistrationsController

  def show
    @user = User.find(current_user.id)
  end

  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
