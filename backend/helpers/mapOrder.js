module.exports = function (orderDb) {
	return {
		id: orderDb._id,
		userId: orderDb.user_id,
		items: orderDb.items.map((item) => {
			return {
				id: item._id,
				name: item.name,
				price: item.price,
				discount: item.discount,
				img: item.img_url,
				discountedPrice: item.discounted_price,
				quantity: item.quantity,
				productId: item.product_id,
			}
		}),
		totalPrice: orderDb.totalPrice,
		createdAt: orderDb.createdAt,
		updatedAt: orderDb.updatedAt,
	}
}
