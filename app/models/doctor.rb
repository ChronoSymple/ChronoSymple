class Doctor < ApplicationRecord

	include ActiveModel::Serializers::JSON

	has_one 	:user, 	as: :user_type

	def self.createDoctor(params)
		new_user 	= User.new(params)
		doctor 	= Doctor.create
		new_user.user_type = doctor
		if new_user.save
			doctor.update({ user: new_user })
		else
			doctor.destroy
			return new_user
		end
		return doctor
	end

end
