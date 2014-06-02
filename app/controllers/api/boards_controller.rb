module Api
  class BoardsController < ApiController
    def index
      @boards = current_user.boards.includes(:lists, :cards)
      render :index
    end

    def show
      @board = Board.find(params[:id])
      render partial: "api/boards/board", locals: { board: @board }
    end

    def create
      @board = current_user.boards.build(board_params)
      if @board.save
        render partial: "api/boards/board", locals: { board: @board }
      else
        render json: { errors: @board.errors.full_messages }, status: 422
      end
    end

    def update
      @board = Board.find(params[:id])

      #TODO make this more flexible so that users can be removed
      @board.members << User.where(id: member_params[:member_ids]) unless member_params[:member_ids].empty?

      if @board.update_attributes(board_params)
        render partial: "api/boards/board", locals: { board: @board }
      else
        render json: { errors: @board.errors.full_messages }, status: 422
      end
    end

    def destroy
      current_user.boards.find(params[:id]).try(:destroy)
      render json: {}
    end

    private
    def board_params
      params.require(:board).permit(:title)
    end

    def member_params
      params.require(:board).permit(member_ids: [])
    end
  end
end
