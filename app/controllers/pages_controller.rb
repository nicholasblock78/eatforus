class PagesController < ApplicationController
	def index
		@categories = Category.all
		@articles = Article.all
	end

	def about

	end

	def locator

	end
end