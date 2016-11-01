# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Category.create(title: 'Farm')
Category.create(title: 'Table')
Category.create(title: 'Miscellaneous')

Article.create(title: "Count those calories!", author: "Richard Seger", body: "The best way to lose weight is to count your calories. You'll see firsthand how much everything you eat affects your daily consumption and it'll slowly affect the decisions your subconscience makes", category_id: 3)
Article.create(title: "Sustainable Farm Practices", author: "Farmer Dave", body: "A sustainable farm is actually much healthier for not only the food, but the environment. Manure from the pigs fertilize the crops and the crops feed the animals.", category_id: 1)
Article.create(title: "Best Places to Shop", author: "Vendor Velma", body: "The best place to shop for your groceries is the farmer's market. This is thef freshest food you'll be able to find. Most of it was often just picked!", category_id: 2)

Comment.create(author: "Bob", text: "Love this! This is exactly what motivated me to lose all of my weight! Thanks for sharing!", article_id: 1)
Comment.create(author: "Large Marge", text: "My pigs couldn't be happier.", article_id: 2)
Comment.create(author: "Billy", text: "Come shop at the farmer's market to buy my fresh beets!", article_id: 3)