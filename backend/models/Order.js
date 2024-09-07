const mongoose = require('mongoose')
const validator = require('validator')

const orderSchema = new mongoose.Schema(
	{
		items: [
			{
				product_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				name: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				img_url: {
					type: String,
					validate: {
						validator: validator.isURL,
						message: 'Картинка должна быть ссылкой!',
					},
					required: true,
				},
				discount: {
					type: Number,
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
			required: true,
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Order', orderSchema)
