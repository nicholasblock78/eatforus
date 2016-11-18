class PagesController < ApplicationController
	def index
		@articles = Article.all
	end

	def locator

	end
end