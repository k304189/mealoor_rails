class Api::V1::UsersController < Api::V1::ApiController
  before_action :authenticate_user!

  def index
    @user = User.all
    render json: @user
  end

  def currentuser
    @user = current_user
    render json: { status: 'SUCCESS', message: 'Loaded the user', data: @user }
  end

end
