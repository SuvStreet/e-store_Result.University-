const Category = require('../models/Category')
const chalk = require('chalk')
const SubCategory = require('../models/Sub-category')
const Product = require('../models/Product')

async function createCategory(name) {
	try {
		const category = await Category.create({ name })

		console.log(chalk.bgGreen(`Категория "${category.name}" успешно добавлена`))

		return category
	} catch (err) {
		console.log(
			chalk.bgRed(`При добавлении категории пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function getCategories() {
	try {
		const categories = await Category.find()
			.populate('subcategories')
			.populate({
				path: 'subcategories',
				populate: { path: 'products' },
			})

		console.log(chalk.bgGreen('Категории успешно получены'))

		return categories
	} catch (err) {
		console.log(
			chalk.bgRed(`При получении категорий пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function editCategory(category_id, name) {
	try {
		const category = await Category.findByIdAndUpdate(
			category_id,
			{ name },
			{ new: true },
		)
			.populate('subcategories')
			.populate({
				path: 'subcategories',
				populate: { path: 'products' },
			})

		if (!category) {
			throw new Error('Категория не найдена!')
		}

		console.log(chalk.bgGreen(`Категория "${category.name}" успешно изменена`))

		return category
	} catch (err) {
		console.log(
			chalk.bgRed(`При получении категорий пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function deleteCategory(category_id) {
	try {
		const category = await Category.findByIdAndDelete(category_id)

		if (!category) {
			throw new Error('Категория не найдена!')
		}

		const subCategories = await SubCategory.find({
			_id: { $in: category.subcategories },
		})

		await SubCategory.deleteMany({
			_id: { $in: category.subcategories },
		})

		const products = await Product.deleteMany({
			_id: { $in: subCategories.map((subCategory) => subCategory.products) },
		})

		console.log(chalk.bgGreen(`Категория "${category.name}" успешно удалена`))
	} catch (err) {
		console.log(
			chalk.bgRed(`При получении категорий пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

module.exports = { createCategory, getCategories, editCategory, deleteCategory }
