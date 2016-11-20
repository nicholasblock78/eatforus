class CreateComments < ActiveRecord::Migration[5.0]
	def change
		create_table :comments do |t|
			t.intgere :article_id
			t.integer :user_id
			t.string :text

			t.timestamps
		end
	end
end
