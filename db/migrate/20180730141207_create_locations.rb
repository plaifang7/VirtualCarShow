class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.string :city_state
      t.string :date
      t.references :car, foreign_key: true

      t.timestamps
    end
  end
end
