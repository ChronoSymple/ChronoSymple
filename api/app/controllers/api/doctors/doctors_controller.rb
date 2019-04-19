class Api::Patients::DoctorsController < ApplicationController

	before_action :authenticate_user, except: [:signin]

	def signin
		doctor = Doctor.createDoctor(permited)

		if doctor.persisted?
			session[:current_patient_id] 	= doctor.user.id
			session[:login_token] 		= doctor.user.login_token
			render json: { login_token: doctor.user.login_token }, status: :created
		else
			render json: { :errors => doctor.errors.full_messages }, status: :unprocessable_entity
		end
	end

private

	def permited_params
		[
			:first_name,
			:last_name,
			:password,
			:phone_number,
			:email
		]
	end

	def permited
		params.permit(permited_params)
	end

end
