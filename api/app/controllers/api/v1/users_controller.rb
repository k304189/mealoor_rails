class Api::V1::UsersController < Api::V1::ApiController
  before_action :authenticate_user!

  def index
    @user = User.all
    render json: @user
  end

  def show
    @user = User.find(params[:id])
    if current_user[:admin] || @user.id == current_user[:id]
      render json: @user
    else
      render status: 401
    end
  end

  def update
    @user = User.find(params[:id])

    if current_user.admin
      @user.update!(update_user_param)
      render json: @user
    else
      render status: 401
    end
  end

  def currentuser
    @user = current_user
    render json: { status: 'SUCCESS', message: 'Loaded the user', data: @user }
  end

  private
    def update_user_param
      params.require(:user)
            .permit(:nickname, :email, :password, :admin)
    end

end
