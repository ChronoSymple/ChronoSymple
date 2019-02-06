class Api::PatientsController < ApplicationController

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

	def add_module
		if current_patient.addModule(DModule.find_by(id: params[:id]))
			render json: {}, status: :ok
		else
			render json: { errors: current_patient.errors.full_messages }, status: :unprocessable_entity
		end
	end

	def remove_module
		if current_patient.removeModule(DModule.find_by(id: params[:id]))
			render json: {}, status: :ok
		else
			render json: { errors: current_patient.errors.full_messages }, status: :unprocessable_entity
		end
	end

	def modules
		render json: { modules: current_patient.d_modules }
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
