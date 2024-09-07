const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	products: [
		{
			item: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
		},
	],
	totalPrice: {
		type: Number,
		default: 0,
	},
})

cartSchema.pre('save', async function (next) {
	const cart = this

	await cart.populate('products.item')

	cart.totalPrice = cart.products.reduce((total, product) => {
		const discount = product.item.discount
		const priceAfterDiscount = Number(
			(product.item.price * (1 - discount / 100)).toFixed(),
		)
		return total + priceAfterDiscount * product.quantity
	}, 0)

	next()
})

module.exports = mongoose.model('Cart', cartSchema)
