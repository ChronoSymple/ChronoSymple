class Doctor < ApplicationRecord

	# class field
	# =======================================
	# patients: 	obj collection
	# user_id: 		integer
	# =======================================

	has_many 			:i_modules
	has_many 			:g_modules, through: :i_modules
	has_many			:patients, 	through: :i_modules

	validates 	:user_id, 	presence: true

	def self.createDoctor(params)
		new_user 	= User.generate_user(params)
		doctor 	= Doctor.new({user_id: new_user.id})
		unless doctor.save
			doctor.errors.clear
			doctor.errors.merge!(new_user.errors)
		end
		return doctor
	end

	def user
		User.find_by(id: self.user_id)
	end

	def self.users
		ids = Doctor.pluck(:user_id)
		User.where(id: ids)
	end

	def self.getInfos
		Doctor.all.map do |d|
			d.getInfo
		end
	end

	def getInfo
		user_info = self.user.attributes.slice('email', 'first_name', 'last_name')
		doc_info = self.attributes.slice('id')
		return doc_info.merge(user_info)
	end

end
