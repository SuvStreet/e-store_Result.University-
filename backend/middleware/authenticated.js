const User = require('../models/User')
const { verify } = require('../helpers/token')
const chalk = require('chalk')

module.exports = async function (req, res, next) {
	try {
		const tokenData = verify(req.cookies.access_token)

		const user = await User.findOne({ _id: tokenData.id })

		if (!user) {
			res.status(401).send({ error: 'Авторизованного пользователя нет!', data: null })

			return
		}

		req.user = user

		next()
	} catch (err) {
		console.log(
			chalk.bgRed(`При проверке авторизации пошло что-то не так: ${err.message}`),
		)
		res.send({ error: err.message, data: null })
	}
}
