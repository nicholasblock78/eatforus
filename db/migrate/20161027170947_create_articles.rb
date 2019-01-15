class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles do |t|
    	t.string :title
    	t.text :body
    	t.integer :category_id
      t.integer :user_id
      t.string :main_image

      t.timestamps
    end
  end
end
