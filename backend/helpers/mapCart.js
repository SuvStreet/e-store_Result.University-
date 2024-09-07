module.exports = function (cartDb) {
	return {
		id: cartDb._id,
		items: cartDb.products.map((item) => {
			return {
				quantity: item.quantity,
				...{
					id: item.item._id,
					name: item.item.name,
					price: item.item.price,
					discount: item.item.discount,
					imgUrl: item.item.images[0],
				},
			}
		}),
		totalPrice: cartDb.totalPrice,
	}
}
