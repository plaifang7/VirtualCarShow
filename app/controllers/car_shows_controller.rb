class CarShowsController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource  only: [:destroy]

  def index
    @car = Car.find(params[:car_id])
    @carshows = @car.car_shows.all
    render json: @carshows
  end

  def show
    @carshow = CarShow.find(params[:id])
    render json: @carshow
  end

  def create 
    @user = current_user
    @car = Car.find(params[:car_id])
    @carshow = @car.car_shows.create!(carshow_params)
    render json: @carshow

  end 

  def destroy
    @user = current_user
    @carshow = CarShow.find(params[:id])
    @carshow.destroy!

    render status: :ok

  end

  private

  def carshow_params
    params.require(:car_show).permit(:location, :city_state, :date).merge(car_id: params[:car_id])

  end
end
