const express = require('express')
const authenticated = require('../middleware/authenticated')
const mapUser = require('../helpers/mapUser')
const {
	editUser,
	getUserList,
	getRoles,
	editUserRole,
	deleteUser,
} = require('../controllers/user.controller')
const hasRole = require('../middleware/hasRole')
const ROLE = require('../constants/roles')

const router = express.Router({ mergeParams: true })

router.get('/', authenticated, async (req, res) => {
	try {
		res.send({ error: null, data: { user: mapUser(req.user) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', user: null })
	}
})

router.get('/roles', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const roles = await getRoles()

		res.send({ error: null, data: roles })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.get('/users', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const users = await getUserList(req.user._id)

		res.send({ error: null, data: { users: users.map(mapUser) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', user: null })
	}
})

router.put('/:id', authenticated, async (req, res) => {
	try {
		const newUser = await editUser(req.params.id, {
			login: req.body.login,
			img_user_url: req.body.imgUserUrl,
		})

		res.send({
			error: null,
			data: {
				user: mapUser(newUser),
			},
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.put('/role/:id', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const updatedUser = await editUserRole(req.params.id, { role_id: req.body.roleId })

		res.send({
			error: null,
			data: {
				user: mapUser(updatedUser),
			},
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.delete('/:id', authenticated, async (req, res) => {
	await deleteUser(req.params.id)

	res.send({ error: null })
})

module.exports = router
