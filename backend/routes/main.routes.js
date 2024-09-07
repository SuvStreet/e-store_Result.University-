const express = require('express')
const { getMain } = require('../controllers/main.controller')
const mapMain = require('../helpers/mapMain')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
	try {
		const { main } = await getMain()

		res.send({ error: null, data: { main: mapMain(main) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

module.exports = router
