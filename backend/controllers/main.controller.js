const chalk = require('chalk')
const SubCategory = require('../models/Sub-category')
const Product = require('../models/Product')

const getRandomItems = (array, count) => {
	const shuffled = array.sort(() => 0.5 - Math.random())
	return shuffled.slice(0, count)
}

async function getMain() {
	try {
		const subcategories = await SubCategory.find()

		const randomSubcategories = getRandomItems(subcategories, 4)

		const main = await Promise.all(
			randomSubcategories.map(async (subcategory) => {
				const products = await Product.find({ subcategory_id: subcategory._id })

				const randomProducts = getRandomItems(products, 5)

				return {
					subcategory: {
						id: subcategory._id,
						name: subcategory.name,
					},
					products: randomProducts,
				}
			}),
		)

		console.log(chalk.bgGreen('Главная страница загружена'))

		return { main }
	} catch (error) {
		console.log(chalk.bgRed('Ошибка при загрузке данных для главной страницы:', error))
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

module.exports = {
	getMain,
}
