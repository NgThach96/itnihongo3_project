class CommentController < ApplicationController
	# def create
	#
	# 	content = params[:content]
	# 	review_id = params[:review_id]
	# 	review = Review.find(review_id)
	# 	newCom = review.comments.new
	# 	newCom.user_id = current_user.id
	# 	newCom.emotion_type = -2
	# 	newCom.review_id = review_id
	# 	newCom.comment = content
	# 	newCom.save
	# end
	def replyaction
		content = params[:content]
		comment_id = params[:comment_id]
		comment = Comment.find(comment_id)
		newRep = comment.replies.new
		newRep.user_id = current_user.id
		newRep.emotion_type = -2
		newRep.comment_id = comment_id
		newRep.reply = content
		newRep.save
	end


end
