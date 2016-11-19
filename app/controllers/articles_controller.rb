class ArticlesController < ApplicationController
	before_action :require_user

	def index
		@articles = Article.all
	end

	def new
		@article = Article.new
		
	end

	def create
		@article = Article.new(article_params)

		if @article.save!
			redirect_to articles_path
		else
			redirect 'articles/new'
		end

	end

	def show
		@article = Article.find(params[:id])
	end

	private
	def article_params
		params.require(:article).permit(:title,:author,:body,:category_id)
	end

end