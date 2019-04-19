class ApplicationController < ActionController::API

	require 'json'

	def current_user
	    @current_user ||= session[:current_user_id] && User.find(session[:current_user_id])
	end

	def current_patient
		@current_patient ||= Patient.find_by(user_id: current_user.id)
	end

	def current_doctor
		@current_doctor ||= Doctor.find_by(user_id: current_user.id)
	end

private

    def authenticate_user
	token = request.headers['Authorization']
	if current_user || (token.present? && (user = User.find_by(login_token: token)))
		session[:login_token]		= user.login_token
		session[:current_user_id]	= user.id
	else
		render status: :unauthorized
	end
    end

end
