const express = require('express')
const {
	addProduct,
	getProduct,
	listProducts,
	editProduct,
	deleteProduct,
	listProductsAll,
} = require('../controllers/product.controller')
const hasRole = require('../middleware/hasRole')
const authenticated = require('../middleware/authenticated')
const ROLE = require('../constants/roles')
const mapProduct = require('../helpers/mapProduct')

const router = express.Router({ mergeParams: true })

router.get('/sub-category/:id', async (req, res) => {
	try {
		const { products, lastPage, minPrice, maxPrice, brand } = await listProducts({
			subcategory_id: req.params.id,
			page: req.query.page,
			limit: req.query.limit,
		})

		res.send({
			error: null,
			data: { products: products.map(mapProduct), lastPage, minPrice, maxPrice, brand },
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.get('/search', async (req, res) => {
	try {
		const { products, lastPage } = await listProductsAll(
			req.query.search,
			req.query.limit,
			req.query.page,
		)

		res.send({
			error: null,
			data: { products: products.map(mapProduct), lastPage },
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.get('/:id', async (req, res) => {
	try {
		const product = await getProduct(req.params.id)

		res.send({
			error: null,
			data: { product: mapProduct(product) },
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.get('/', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const { products, lastPage } = await listProducts({ page: req.query.page })

		res.send({
			error: null,
			data: { products: products.map(mapProduct), lastPage },
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.post('/add', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const { product } = await addProduct(req.body)

		res.send({ error: null, data: { product: mapProduct(product) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.put('/edit/:id', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const updatedProduct = await editProduct(req.params.id, req.body)

		res.send({ error: null, data: { product: mapProduct(updatedProduct) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.delete('/:product_id', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	await deleteProduct(req.params.product_id)

	res.send({ error: null })
})

module.exports = router
