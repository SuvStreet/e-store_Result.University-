const mongoose = require('mongoose')
const mapComment = require('./mapComment')

function mapFeature(featureDb) {
	return {
		id: featureDb._id,
		key: featureDb.key,
		value: featureDb.value,
	}
}

module.exports = function (productDb) {
	return {
		id: productDb._id,
		name: productDb.name,
		images: productDb.images,
		description: productDb.description,
		subCategoryId: {
			id: productDb.subcategory_id._id,
			name: productDb.subcategory_id.name,
		},
		brand: productDb.brand,
		price: productDb.price,
		quantity: productDb.quantity,
		discount: productDb.discount,
		rating: productDb.rating,
		comments: productDb.comments.map((comment) =>
			mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment),
		),
		features: productDb.features.map((feature) =>
			mongoose.isObjectIdOrHexString(feature) ? feature : mapFeature(feature),
		),
	}
}
