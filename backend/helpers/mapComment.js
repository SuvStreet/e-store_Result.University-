module.exports = function (commentDb) {
	return {
		id: commentDb._id,
		text: commentDb.text,
		userId: commentDb.user_id,
		productId: commentDb.product_id,
		createdAt: commentDb.createdAt,
		updatedAt: commentDb.updatedAt,
	}
}
