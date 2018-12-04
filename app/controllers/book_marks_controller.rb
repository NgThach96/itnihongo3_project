class BookMarksController < ApplicationController

    def index
        @bookmarks = BookMark.where(user_id: current_user.id)
    end

end
