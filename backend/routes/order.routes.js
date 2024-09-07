const express = require('express')
const authenticated = require('../middleware/authenticated')
const { createOrder, listOrders, getOrder } = require('../controllers/order.controller')
const mapOrder = require('../helpers/mapOrder')
const hasRole = require('../middleware/hasRole')
const ROLE = require('../constants/roles')

const router = express.Router({ mergeParams: true })

router.post('/create', authenticated, async (req, res) => {
	try {
		const order = await createOrder(req.body.cart, req.user.id)
		res.send({ error: null, data: { order: mapOrder(order) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.get('/', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const { orders, lastPage } = await listOrders({ page: req.query.page })

		res.send({
			error: null,
			data: { orders: orders.map(mapOrder), lastPage },
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.get('/:id', authenticated, async (req, res) => {
	try {
		const orderUser = await getOrder(req.params.id)

		res.send({
			error: null,
			data: { order: orderUser.map(mapOrder) },
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

module.exports = router
