module UsersHelper
	def current_user
		@current_user ||= User.find(session[:user_id]) if session[:user_id]
	end

	def require_user
		if current_user
			true
		else
			redirect_to new_user_session_path, notice: "You must be logged in to view that page."
		end
	end
end
