const express = require('express')
const authenticated = require('../middleware/authenticated')
const hasRole = require('../middleware/hasRole')
const ROLE = require('../constants/roles')
const {
	createCategory,
	getCategories,
	editCategory,
	deleteCategory,
} = require('../controllers/category.controller')
const mapCategory = require('../helpers/mapCategory')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
	try {
		const categories = await getCategories()
		res.send({ error: null, data: { categories: categories.map(mapCategory) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.post('/add', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const category = await createCategory(req.body.name)

		res.send({
			error: null,
			data: {
				category: mapCategory(category),
			},
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.put('/edit/:id', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const updatedCategory = await editCategory(req.params.id, req.body.name)

		res.send({
			error: null,
			data: {
				category: mapCategory(updatedCategory),
			},
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.delete('/:id', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	await deleteCategory(req.params.id)

	res.send({ error: null })
})

module.exports = router
