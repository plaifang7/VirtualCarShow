class Ability
  include CanCan::Ability

  def initialize(user)
  user ||= User.new
  can :read, Car

  can [:destroy], Car do |car|
    car.user == user
  end

  can [:create], Car do |car|
    car.user == user
  end
  
  can [:update], Car do |car|
    car.user == user
  end
 
end
def initialize(car)
  car ||= Car.new
  can :read, CarShow
  
  can [:destroy], CarShow do |carshow|
    carshow.car == user
  end

  can [:create], CarShow do |carshow|
    carshow.car == user
  end
end

end
