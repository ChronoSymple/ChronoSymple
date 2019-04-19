class User < ApplicationRecord

	# class field
	# =======================================
	# first_name: 		string
	# last_name: 		string
	# password: 		string
	# phone_number: 		string
	# email: 			string
	# login_token: 		string
	# last_connection: 	Time
	# =======================================

	after_create :generate_token

	validates :first_name, 	presence: true
	validates :last_name, 	presence: true
	validates :email, 	presence: true, uniqueness: true
	validates :password, 	presence: true, length: { minimum: 6 }
	validates :login_token, uniqueness: true, if: -> { login_token.present? }

  	def generate_token
  		loop do
      		self.login_token = SecureRandom.urlsafe_base64(32, false)
      		break if self.save
    		end
  	end

  	def self.generate_user(params)
  		new_user = User.new(params)
  		if new_user.save
  			new_user.update({ password: BCrypt::Password.create(new_user.password) })
  		end
  		return new_user
  	end

  	def self.authenticate(email, password)
  		user = User.find_by(email: email)
  		if user.present? && BCrypt::Password.new(user.password) == password
  			user.generate_token
  		else
  			return nil
  		end
		  return user
  	end

end
