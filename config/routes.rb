Rails.application.routes.draw do

  get 'sessions/new'


  post 'sessions/create'

  delete 'sessions/destroy'


  resources 'users' do 
    resources 'recipes'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # resources 'articles'
  # resources 'categories'

get 'articles/new' => 'articles#new'
post 'articles' => 'articles#create'
get 'articles' => 'articles#index'

get 'locator' => 'pages#locator'
get 'calculator' => 'pages#calculator'
get 'about' => 'pages#about'

resources 'reviews'
  resources 'categories' do
  	resources 'articles' do
      resources 'comments'
    end
  end

  root 'pages#index'
end
