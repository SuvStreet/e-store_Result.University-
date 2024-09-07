const chalk = require('chalk')
const Cart = require('../models/Cart')
const currentCart = require('../helpers/currentCart')

async function getCart(user_id) {
	try {
		const cart = await Cart.findOne({ user_id }).populate('products.item')

		if (!cart) {
			return null
		}

		await currentCart(cart)

		return cart
	} catch (err) {
		console.log(chalk.bgRed(`При получении карзины пошло что-то не так: ${err.message}`))
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function addCart(products, user_id) {
	try {
		let cart = await Cart.findOne({ user_id }).populate('products.item')

		if (!cart) {
			cart = await Cart.create({ user_id, products })
			cart = await cart.populate('products.item')

			console.log(chalk.bgGreen('Корзина создана'))
			return cart
		}

		products.forEach((incomingProduct) => {
			const existingProduct = cart.products.find(
				(product) => product.item._id.toString() === incomingProduct.item.toString(),
			)

			if (existingProduct) {
				existingProduct.quantity += incomingProduct.quantity
			} else {
				cart.products.push(incomingProduct)
			}
		})

		await cart.save()

		cart = await cart.populate('products.item')

		await currentCart(cart)

		console.log(chalk.bgGreen('В карзину добавлены продукты'))

		return cart
	} catch (err) {
		console.log(
			chalk.bgRed(`При добавлении в карзину пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function updateCart(id, product_id, type) {
	try {
		switch (type) {
			case 'plus':
				await Cart.findOneAndUpdate(
					{ _id: id, 'products.item': product_id },
					{ $inc: { 'products.$.quantity': 1 } },
					{ new: true },
				)
				break
			case 'minus':
				await Cart.findOneAndUpdate(
					{ _id: id, 'products.item': product_id },
					{ $inc: { 'products.$.quantity': -1 } },
				)
				break
			case 'delete':
				await Cart.findOneAndUpdate(
					{ _id: id, 'products.item': product_id },
					{ $pull: { products: { item: product_id } } },
				)
				break
			default:
				break
		}

		const updatedCart = await Cart.findOne({ _id: id }).populate('products.item')

		await currentCart(updatedCart)

		return updatedCart
	} catch (err) {
		console.log(chalk.bgRed(`При обновлении карзины пошло что-то не так: ${err.message}`))
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function deleteCart(id) {
	try {
		await Cart.findByIdAndDelete(id)
	} catch (err) {
		console.log(chalk.bgRed(`При удалении карзины пошло что-то не так: ${err.message}`))
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

module.exports = {
	getCart,
	addCart,
	updateCart,
	deleteCart,
}
