class Api::Patients::PatientsController < ApplicationController

	before_action :authenticate_user, except: [:signin]

	def signin
		patient = Patient.createPatient(permited)

		if patient.persisted?
			session[:current_patient_id] 	= patient.user.id
			session[:login_token] 		= patient.user.login_token
			render json: { login_token: patient.user.login_token }, status: :created
		else
			render json: { errors: patient.errors.full_messages }, status: :unprocessable_entity
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
