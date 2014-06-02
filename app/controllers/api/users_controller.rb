module Api
  class UsersController < ApiController
    def index
      @users = User.all 
      render :index
    end
  end
end