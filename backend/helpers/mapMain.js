module.exports = function (mainDb) {
	return mainDb.map((item) => {
		return {
			subcategory: {
				id: item.subcategory.id,
				name: item.subcategory.name,
			},
			products: item.products.map((item) => {
				return {
					id: item._id,
					name: item.name,
					price: item.price,
					imgUrl: item.images[0],
				}
			}),
		}
	})
}
