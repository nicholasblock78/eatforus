class CreateRecipes < ActiveRecord::Migration[5.0]
  def change
    create_table :recipes do |t|
      t.string :title
    	t.string :description
    	t.integer :prep_time
    	t.integer :cook_time
      t.integer :user_id
      t.string :image
      t.timestamps
    end
  end
end
