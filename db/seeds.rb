User.create(first_name: 'Nick', last_name: 'Block', email: 'n@b.com', password: 'pass')

Category.create(title: 'Farm')
Category.create(title: 'Table')
Category.create(title: 'Miscellaneous')

Article.create(title: "Count those calories!", user_id: 1, body: "The best way to lose weight is to count your calories. You'll see firsthand how much everything you eat affects your daily consumption and it'll slowly affect the decisions your subconscience makes", category_id: 3)
Article.create(title: "Sustainable Farm Practices", user_id: 1, body: "A sustainable farm is actually much healthier for not only the food, but the environment. Manure from the pigs fertilize the crops and the crops feed the animals.", category_id: 1)
Article.create(title: "Best Places to Shop", user_id: 1, body: "The best place to shop for your groceries is the farmer's market. This is thef freshest food you'll be able to find. Most of it was often just picked!", category_id: 2)

Comment.create(user_id: 1, text: "Love this! This is exactly what motivated me to lose all of my weight! Thanks for sharing!", article_id: 1)
Comment.create(user_id: 1, text: "My pigs couldn't be happier.", article_id: 2)
Comment.create(user_id: 1, text: "Come shop at the farmer's market to buy my fresh beets!", article_id: 3)

Recipe.create(title: 'Homemade Popcorn', image: 'https://www.simplyrecipes.com/wp-content/uploads/2015/01/perfect-popcorn-vertical-b-1800.jpg',description: 'Ditch the microwave and make this classic snack extra deliciously fresh and healthy!', prep_time: 5, cook_time: 5, user_id: 1)
	Ingredient.create(title: 'unpopped corn kernels', amount: '1 cup', recipe_id: 1 )
	Ingredient.create(title: 'olive oil', amount: '1/4 cup', recipe_id: 1 )
	Ingredient.create(title: 'salt', amount: 'to taste', recipe_id: 1 )
	Instruction.create(step: 'Pour kernels and oil into stockpot. Be sure all the kernels are covered. Turn on the heat onto medium-high. Cover pot with lid', recipe_id: 1)
	Instruction.create(step: "Listen for popping. Occassionally shake pot to even out kernels not yet popped.", recipe_id: 1 )
	Instruction.create(step: 'Once popping slows, turn off the heat.', recipe_id: 1)
	Instruction.create(step: "Pour a little olive oil and the salt over popped popcorn and mix. Then serve!", recipe_id: 1)