# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all

corey_barret = User.create!(
  email: 'cbarret@aol.com',
  password: 'hellkeazy',
  password_confirmation: 'hellkeazy'
)

cj = User.create!(
  email: 'cj_on_32s@aol.com',
  password: 'bumblebee',
  password_confirmation: 'bumblebee'
)


hellkeazy = corey_barret.cars.create!(
  make: 'Dodge',
  model: 'Challenger Hellcat',
  year: '2016',
  color: 'perriwinkle',
  rating: 4,
  image: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/31689311_357066891454713_3866109983951159296_n.jpg?_nc_cat=0&oh=ce906e96290cbbed9c9b70680da2f9d2&oe=5C111B1A'
)

bumblebee = cj.cars.create!(
  make: 'Cheverolet',
  model: 'Camaro SS',
  year: '2017',
  color: 'red',
  rating: 4,
  image: 'https://scontent-waw1-1.cdninstagram.com/vp/c8d01cde65ad0247900e25d83bcddaf4/5BD14962/t51.2885-15/e35/35986760_2039466109715659_4037680106221600768_n.jpg?efg=eyJ1cmxnZW4iOiJ1cmxnZW5fZnJvbV9pZyJ9'

)

bumblebee.car_shows.create!(
  
)

puts 'seeds created'