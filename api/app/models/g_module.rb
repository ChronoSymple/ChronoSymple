class GModule < ApplicationRecord
	# class field
	# =======================================
	# name: 		string
	# color: 		string
	# icon: 		string
	# =======================================

	has_many 	:i_modules
	has_many 	:doctors, 	through: :i_modules
	has_many	:patients, 	through: :i_modules

end
