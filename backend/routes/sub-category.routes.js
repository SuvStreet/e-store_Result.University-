const express = require('express')
const {
	createSubCategory,
	getSubCategories,
	editSubCategory,
	deleteSubCategory,
} = require('../controllers/sub-category.controller')
const authenticated = require('../middleware/authenticated')
const hasRole = require('../middleware/hasRole')
const ROLE = require('../constants/roles')
const mapSubCategory = require('../helpers/mapSubCategory')

const router = express.Router({ mergeParams: true })

router.get('/', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const subCategories = await getSubCategories()
		res.send({ error: null, data: { subCategories: subCategories.map(mapSubCategory) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.get('/:id', async (req, res) => {
	try {
		const subCategories = await getSubCategories(req.params.id)

		res.send({
			error: null,
			data: { subCategories: subCategories.map(mapSubCategory) },
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.post('/add', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const subCategory = await createSubCategory(
			req.body.name,
			req.body.category_id,
			req.body.img_url,
		)

		res.send({
			error: null,
			data: {
				subCategory: mapSubCategory(subCategory),
			},
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.put('/edit/:id', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const updatedSubCategory = await editSubCategory(
			req.params.id,
			req.body.name,
			req.body.category_id,
			req.body.img_url,
		)

		res.send({ error: null, data: { subCategory: mapSubCategory(updatedSubCategory) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.delete(
	'/:sub_category_id',
	authenticated,
	hasRole([ROLE.ADMIN]),
	async (req, res) => {
		await deleteSubCategory(req.params.sub_category_id)

		res.send({ error: null })
	},
)

module.exports = router
