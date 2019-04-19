class Api::Patients::DoctorsController < ApplicationController

	before_action :authenticate_user

	def index
		doctors = Doctor.getInfos
		render json: { doctors: doctors }, status: :ok
	end

	def my_doctors
		doctors = current_patient.getDoctorsInfo
		render json: { doctors: doctors }, status: :ok
	end

	def add_doctor
		doctor = Doctor.find_by(id: params[:doctor_id])
		g_module = GModule.find_by(id: params[:module_id])

		if g_module.nil? || doctor.nil?
			render json: { errors: "Doctor or Module not found" }, status: :not_found
		elsif current_patient.addDoctor(doctor, g_module)
			render json: {}, status: :ok
		else
			render json: { :errors => current_patient.errors.full_messages }, status: :unprocessable_entity
		end
	end

	def remove_doctor
		doctor = current_patient.doctors.find_by(id: params[:doctor_id])
		g_module = current_patient.g_modules.find_by(id: params[:module_id])

		puts doctor
		puts g_module
		if doctor.nil? || g_module.nil?
			render json: { errors: "Doctor not found" }, status: :not_found
		elsif current_patient.removeDoctor(doctor, g_module)
			render json: {}, status: :ok
		else
			render json: { :errors => current_patient.errors.full_messages }, status: :unprocessable_entity
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
