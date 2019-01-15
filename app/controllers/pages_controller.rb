require 'firebase'

class PagesController < ApplicationController
	def index
		@categories = Category.all
		@articles = Article.all
		firebase_url='https://work-test-201217.firebaseio.com/'
		firebase_secret='cJsiYgUrnY4NT1F5WF3q5avhpatE1kyUNzAgDUlO'
		firebase = Firebase::Client.new(firebase_url,firebase_secret)
		response = firebase.push("users/todos",{:name => "pick the milk", :priority => 1})
	end

	def about

	end

	def locator

	end

	def update

	end
end