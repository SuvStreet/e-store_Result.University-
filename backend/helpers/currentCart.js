module.exports = async function (cart) {
	cart.products.forEach((product) => {
		product.item.currentPrice = product.item.price * (1 - product.item.discount / 100)
	})

	cart.totalPrice = cart.products.reduce((total, product) => {
		return total + product.item.currentPrice * product.quantity
	}, 0)

	await cart.save()
}
