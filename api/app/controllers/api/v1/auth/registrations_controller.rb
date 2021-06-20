class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  # before_action :configure_permitted_parameters

  private

  def sign_up_params
    params.require(:registration).permit(:nickname, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.require(:registration).permit(:nickname, :admin)
  end

  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:nickname, :admin])
  # end

end
