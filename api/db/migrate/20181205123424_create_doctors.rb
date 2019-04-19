class CreateDoctors < ActiveRecord::Migration[5.2]

  def change
	create_table 		:users do |t|
		t.string 		:first_name
	 	t.string      	:last_name
		t.string 		:email
	  	t.string  		:phone_number
		t.string 		:password
		t.string 		:login_token
		t.time 		:last_connection
		t.timestamps
	end

	create_table 		:doctors do |t|
		t.integer 		:user_id
	end

	create_table 		:patients do |t|
		t.integer 		:user_id
	end

  end
end
