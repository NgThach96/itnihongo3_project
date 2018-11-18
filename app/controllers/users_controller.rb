class UsersController < Devise::RegistrationsController

  def show
    @user = User.find(current_user.id)
    
    
  end

  def change
    target = User.find(current_user.id)
    # if params[:username]!=nil
    #   username = params[:username]
    #   target.name = username
    # end
    # if params[:email]!=nil
    #   email = params[:email]
    #   target.email = email
    # end
    # if params[:address]!=nil
    #   address = params[:address]
    #   target.address = address
    # end
    # if params[:birthday]!=nil
    #   birthday = params[:birthday]
    #   target.birthday = birthday
    # end
    # if params[:gender]!=nil
    #   gender = params[:gender]
    #   target.gender = gender
    # end
    username = params[:username]
    target.name = username
    

    target.save
    # redirect_back(fallback_location: root_path)

    # newUser = User.new
    # newUser.name = params[:username]
    # newUser.email = params[:email]
    # newUser.address = params[:address]
    # newUser.birthday = params[:birthday]
    # newUser.gender = params[:gender]
    # newUser.save
    
  end

   def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
