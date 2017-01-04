class PagesController < ApplicationController
	def index
		@categories = Category.all
		@articles = Article.all
	end

	def locator

	end
end