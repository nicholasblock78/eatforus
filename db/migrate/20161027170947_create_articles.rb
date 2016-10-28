class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles do |t|
    	t.string :title
    	t.string :author
    	t.text :body
    	t.integer :category_id

      t.timestamps
    end
  end
end
