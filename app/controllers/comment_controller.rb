class CommentController < ApplicationController
	def create
		if (user_signed_in?)
			@comment = Comment.new(params.require(:comment).permit(:review_id, :emotion_type, :comment))
			@comment.user_id = current_user.id
			@comment.save()
			redirect_back(fallback_location: root_path)
		else
			render :file => "app/views/devise/sessions/new.html.erb"
		end
	end


end
