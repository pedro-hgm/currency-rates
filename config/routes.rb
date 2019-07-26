Rails.application.routes.draw do
  get "currencies/index"
  root "currencies#index"
end
