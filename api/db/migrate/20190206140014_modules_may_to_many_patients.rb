class ModulesMayToManyPatients < ActiveRecord::Migration[5.2]

     	def change
          	create_table :i_modules do |t|
                	t.belongs_to :patient, index: true
                 	t.belongs_to :g_module, index: true
                 	t.integer :doctor_id, index: true
          	end
      end

end
