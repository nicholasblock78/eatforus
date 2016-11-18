class SessionsController < ApplicationController
	def new
	end

	def create
		user = User.find_by(email: params[:email])
		if user && user.authenticate(params[:password])
			session[:user_id] = user.id
			redirect_to root_path
		else
			flash.now[:error] = "There was a problem authenticating."
			render action: 'new'
		end
	end

	def destroy
		session[:user_id] = nil
		flash.now[:logout_success] = "You have successfully logged out."
		redirect_to '/'
	end
end
