const mongoose = require('mongoose')
const validator = require('validator')

const subCategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	category_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	img_url: {
		type: String,
		validate: {
			validator: validator.isURL,
			message: 'Картинка должна быть ссылкой!',
		},
		default:
			'https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg',
	},
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	],
})

module.exports = mongoose.model('SubCategory', subCategorySchema)
