class CreateInstructions < ActiveRecord::Migration[5.0]
  def change
    create_table :instructions do |t|
      t.string :step
    	t.integer :recipe_id
      t.timestamps
    end
  end
end
