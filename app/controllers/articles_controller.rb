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
		@category = Category.find(params[:category_id])
		@comment = Comment.new	
	end

	private
	def article_params
		params.require(:article).permit(:title,:user_id,:body,:category_id)
	end

end