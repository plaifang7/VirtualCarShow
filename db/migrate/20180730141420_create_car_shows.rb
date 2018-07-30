class CreateCarShows < ActiveRecord::Migration[5.2]
  def change
    create_table :car_shows do |t|
      t.string :location
      t.string :city_state
      t.string :date
      t.references :car, foreign_key: true

      t.timestamps
    end
  end
end
