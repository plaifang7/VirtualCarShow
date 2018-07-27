class Ability
  include CanCan::Ability

  def initialize(user)
  user ||= User.new
  can :read, Car

  can [:destroy], Car do |car|
    car.user == user
  end
end
end
