Rails.application.routes.draw do
  get 'sessions/new'

  get 'sessions/create'

  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # resources 'articles'
  # resources 'categories'

get 'articles/new' => 'articles#new'  
post 'articles' => 'articles#create'
get 'articles' => 'articles#index'

get 'locator' => 'pages#locator'

  resources 'categories' do 
  	resources 'articles'
  end

  root 'pages#index'
end
