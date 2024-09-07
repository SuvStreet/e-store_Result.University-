const Product = require('../models/Product')
const chalk = require('chalk')
const SubCategory = require('../models/Sub-category')
const { default: mongoose } = require('mongoose')

async function addProduct(dataProducts) {
	try {
		const { subcategory_id } = dataProducts

		const product = await Product.create({
			...dataProducts,
		})

		const subcategory = await SubCategory.findByIdAndUpdate(subcategory_id, {
			$push: { products: product },
		})

		if (!subcategory) {
			await Product.findByIdAndDelete(product)
			throw new Error('Подкатегория не найдена')
		}

		console.log(chalk.bgGreen(`Продукт "${product.name}" успешно добавлен`))

		return { product }
	} catch (err) {
		console.log(
			chalk.bgRed(`При добавлении продукта пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function getProduct(id) {
	try {
		const product = await Product.findById(id)

		if (!product) {
			throw new Error('Продукт не найден!')
		}

		console.log(chalk.bgGreen(`Продукт "${product.name}" успешно получен`))

		return product
	} catch (err) {
		console.log(chalk.bgRed(`При получении продукта пошло что-то не так: ${err.message}`))
		throw new Error('Продукт не найден!')
	}
}

async function listProducts({ subcategory_id, page = 1, limit = 5 }) {
	try {
		let products = []
		let count = 0
		let filter = []

		if (subcategory_id) {
			;[products, count, filter] = await Promise.all([
				Product.find({ subcategory_id })
					.limit(limit)
					.skip((page - 1) * limit),
				Product.countDocuments({ subcategory_id }),
				Product.aggregate([
					{ $match: { subcategory_id: new mongoose.Types.ObjectId(subcategory_id) } },
					{
						$group: {
							_id: null,
							minPrice: { $min: '$price' },
							maxPrice: { $max: '$price' },
							brand: { $addToSet: '$brand' },
						},
					},
				]),
			])
		} else {
			;[products, count] = await Promise.all([
				Product.find()
					.limit(limit)
					.skip((page - 1) * limit)
					.populate('subcategory_id'),
				Product.countDocuments(),
			])
		}

		if (!products.length) {
			throw new Error('Продукты не найдены!')
		}

		const { minPrice, maxPrice, brand } = filter[0] || []

		console.log(chalk.bgGreen('Продукты успешно получены'))

		return { products, lastPage: Math.ceil(count / limit), minPrice, maxPrice, brand }
	} catch (err) {
		console.log(
			chalk.bgRed(`При получении продуктов пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function listProductsAll(search = '', limit = 10, page = 1) {
	try {
		const searchTerms = [
			{ name: { $regex: search, $options: 'i' } },
			{ brand: { $regex: search, $options: 'i' } },
			{ description: { $regex: search, $options: 'i' } },
		]

		const [products, count] = await Promise.all([
			Product.find({
				$or: searchTerms,
			})
				.limit(limit)
				.skip((page - 1) * limit)
				.sort({ createdAt: -1 }),
			Product.countDocuments({
				$or: searchTerms,
			}),
		])

		return { products, lastPage: Math.ceil(count / limit) }
	} catch (err) {
		console.log(
			chalk.bgRed(`При получении продуктов пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function editProduct(id, product) {
	try {
		const oldProduct = await Product.findById(id)

		if (!oldProduct) {
			throw new Error('Продукт не найден!')
		}

		if (String(oldProduct.subcategory_id._id) !== String(product.subcategory_id)) {
			await SubCategory.findByIdAndUpdate(oldProduct.subcategory_id._id, {
				$pull: { products: id },
			})
			await SubCategory.findByIdAndUpdate(product.subcategory_id, {
				$push: { products: id },
			})
		}

		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			{ ...product },
			{ new: true },
		).populate('subcategory_id')

		if (!updatedProduct) {
			throw new Error('Ошибка обновления продукта!')
		}

		console.log(chalk.bgGreen(`Продукт "${updatedProduct.name}" успешно изменён`))

		return updatedProduct
	} catch (err) {
		console.log(
			chalk.bgRed(`При получении продуктов пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function deleteProduct(product_id) {
	try {
		const product = await Product.findByIdAndDelete(product_id)

		if (!product) {
			throw new Error('Продукт не найден!')
		}

		await SubCategory.findByIdAndUpdate(product.subcategory_id, {
			$pull: { products: product_id },
		})

		console.log(chalk.bgGreen(`Продукт "${product.name}" успешно удален`))
	} catch (err) {
		console.log(
			chalk.bgRed(`При получении продуктов пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

module.exports = {
	addProduct,
	getProduct,
	listProducts,
	editProduct,
	deleteProduct,
	listProductsAll,
}
