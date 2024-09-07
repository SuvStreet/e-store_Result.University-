const Category = require('../models/Category')
const SubCategory = require('../models/Sub-category')
const Product = require('../models/Product')
const chalk = require('chalk')

async function createSubCategory(name, category_id, img_url) {
	try {
		const subCategory = await SubCategory.create({ name, category_id, img_url })

		const category = await Category.findByIdAndUpdate(category_id, {
			$push: { subcategories: subCategory },
		})

		await SubCategory.populate(subCategory, { path: 'category_id' })

		console.log(
			chalk.bgGreen(
				`Подкатегория "${subCategory.name}" успешно добавлена в категорию ${category.name}`,
			),
		)

		return subCategory
	} catch (err) {
		console.log(
			chalk.bgRed(`При добавлении подкатегории пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function getSubCategories(category_id) {
	try {
		let subCategories = []

		if (category_id) {
			subCategories = await SubCategory.find({ category_id }).populate('products')

			if (!subCategories.length) {
				throw new Error(`Список подкатегорий категории "${category_id}" не найдена!`)
			}

			console.log(
				chalk.bgGreen(`Список подкатегорий категории "${category_id}" успешно получена`),
			)

			return subCategories
		}

		subCategories = await SubCategory.find().populate('category_id').populate('products')

		if (!subCategories.length) {
			throw new Error('Список подкатегорий не найден!')
		}

		console.log(chalk.bgGreen('Список подкатегорий успешно получен'))

		return subCategories
	} catch (err) {
		console.log(
			chalk.bgRed(
				`При получении списка подкатегорий пошло что-то не так: ${err.message}`,
			),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function editSubCategory(id, name, category_id, img_url) {
	try {
		const oldSubCategory = await SubCategory.findById(id)

		if (!oldSubCategory) {
			throw new Error('Подкатегория не найдена!')
		}

		const oldCategoryId = oldSubCategory.category_id._id

		const subCategory = await SubCategory.findByIdAndUpdate(
			id,
			{
				name,
				category_id,
				img_url,
			},
			{ new: true },
		)
			.populate('category_id')
			.populate('products')

		if (!subCategory) {
			throw new Error('Подкатегория не найдена!')
		}

		if (oldCategoryId.toString() !== category_id) {
			await Category.findByIdAndUpdate(oldCategoryId, {
				$pull: { subcategories: id },
			})
			await Category.findByIdAndUpdate(category_id, {
				$push: { subcategories: id },
			})
		}

		console.log(chalk.bgGreen(`Подкатегория "${subCategory.name}" успешно изменена`))

		return subCategory
	} catch (err) {
		console.log(
			chalk.bgRed(`При изменении подкатегории пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function deleteSubCategory(id) {
	try {
		const subCategory = await SubCategory.findByIdAndDelete(id)

		if (!subCategory) {
			throw new Error('Подкатегория не найдена!')
		}

		await Category.findByIdAndUpdate(subCategory.category_id, {
			$pull: { subcategories: id },
		})

		await Product.deleteMany({
			_id: { $in: subCategory.products },
		})

		console.log(chalk.bgGreen(`Подкатегория "${subCategory.name}" успешно удалена`))
	} catch (err) {
		console.log(
			chalk.bgRed(`При получении подкатегорий пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

module.exports = {
	createSubCategory,
	getSubCategories,
	editSubCategory,
	deleteSubCategory,
}
