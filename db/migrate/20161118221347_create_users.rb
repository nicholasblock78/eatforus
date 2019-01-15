class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.string :pantry_id
      t.string :grocery_list_id
      t.string :weight

      t.timestamps
    end
    add_index :users, :email
  end
end
