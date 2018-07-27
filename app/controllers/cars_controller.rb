class CarsController < ApplicationController
  before_action :authenticate_user!

def index
@cars = Car.all
render json: @cars
end

def show
@car = Car.find(params[:id])
render json: @car
end

def create
  @user = current_user
  @car = @user.cars.create!(car_params)
  render json: @car

end

def update
@car = Car.find(params[:id])
@car.update!(car_params)
render json: @car
end

def destroy
@user = current_user
@car = Car.find(params[:id])
@car.destroy!

render status: :ok
end

private

def car_params
params.require(:cars).permit(:make, :model, :year, :color, :rating, :image)
end


end
