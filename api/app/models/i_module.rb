class IModule < ApplicationRecord
	belongs_to 	:patient
	belongs_to 	:doctor, 	optional: true
	belongs_to 	:g_module
	has_many 	:notes
end
