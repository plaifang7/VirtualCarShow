Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

 
  resources :cars do
    resources :car_shows
  end

end
