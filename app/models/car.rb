class Car < ApplicationRecord
  belongs_to :user
  has_many :car_shows, dependent: :destroy
end
