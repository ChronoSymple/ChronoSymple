class Api::Patients::NotesController < ApplicationController

	before_action :authenticate_user

	def create
		note = Note.generateNote(params[:module_id], params[:data], current_patient)
		
		if note.save
			render json: { }, status: :ok
		else
			render json: { errors: note.errors.full_messages }, status: :unprocessable_entity
		end
	end

	def destroy
		note = current_patient.notes.find_by(id: params[:id])
		if note && note.destroy
			render json: { }, status: :ok
		else
			render json: { errors: note.errors.full_messages }, status: :unprocessable_entity
		end
	end

	def update
		note = current_patient.notes.find_by(id: params[:id])
		if note && note.update({data: params[:data]})
			render json: { }, status: :ok
		else
			render json: { errors: note.errors.full_messages }, status: :unprocessable_entity
		end
	end

	def index
		notes = current_patient.notes.select(:id, :data)
		render json: { notes: notes }, status: :ok
	end

private

	def permited_params
		params.require(:note).permite(:module_id, :data)
	end

end
