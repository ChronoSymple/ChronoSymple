class Api::SessionsController < ApplicationController

	before_action :authenticate_user, except: [:login]

	def logout
		current_user.update({login_token: nil})
		reset_session
		render status: :ok
	end

	def login
		token = request.headers['Authorization']
		user = User.authenticate(params[:email], params[:password])
		user ||= User.find_by(login_token: token) if token

		if user
			session[:login_token] = user.login_token
			render json: { login_token: user.login_token }, status: :ok
		else
			render status: :unauthorized
		end
	end
end
