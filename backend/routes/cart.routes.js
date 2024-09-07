const express = require('express')
const authenticated = require('../middleware/authenticated')
const {
	addCart,
	getCart,
	updateCart,
	deleteCart,
} = require('../controllers/cart.controller')
const mapCart = require('../helpers/mapCart')

const router = express.Router({ mergeParams: true })

router.get('/', authenticated, async (req, res) => {
	try {
		const cart = await getCart(req.user.id)

		cart === null
			? res.send({ error: null, data: { cart: { items: [], totalPrice: 0 } } })
			: res.send({ error: null, data: { cart: mapCart(cart) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.post('/add', authenticated, async (req, res) => {
	try {
		const cart = await addCart(req.body.products, req.user.id)
		res.send({ error: null, data: { cart: mapCart(cart) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.put('/update/:id', authenticated, async (req, res) => {
	try {
		const updatedCart = await updateCart(
			req.params.id,
			req.body.product_id,
			req.query.type,
		)
		res.send({ error: null, data: { cart: mapCart(updatedCart) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.delete('/:id', authenticated, async (req, res) => {
	try {
		await deleteCart(req.params.id)
		res.send({ error: null })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

module.exports = router
