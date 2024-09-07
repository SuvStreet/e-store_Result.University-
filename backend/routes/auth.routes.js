const express = require('express')
const { register, login } = require('../controllers/auth.controller')
const mapUser = require('../helpers/mapUser')
const configCooke = require('../constants/config-cooke')

const router = express.Router({ mergeParams: true })

router.post('/register', async (req, res) => {
	try {
		const { token, user } = await register(req.body.email, req.body.password)

		res.cookie('access_token', token, configCooke).send({
			error: null,
			data: {
				user: mapUser(user),
			},
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.post('/authorize', async (req, res) => {
	try {
		const { token, user } = await login(req.body.email, req.body.password)

		res.cookie('access_token', token, configCooke).send({
			error: null,
			data: {
				user: mapUser(user),
			},
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.post('/logout', (req, res) => {
	res.clearCookie('access_token').send({ error: null, data: null })
})

module.exports = router
