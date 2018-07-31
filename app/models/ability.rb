class Ability
  include CanCan::Ability

  def initialize(user)
  user ||= User.new
  can :read, Car, CarShow

  can [:destroy], Car do |car|
    car.user == user
  end
  can [:destroy], CarShow do |carshow|
    carshow.car == user
  end
end
end
