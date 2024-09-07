const bcrypt = require('bcrypt')
const User = require('../models/User')
const { generate } = require('../helpers/token')
const chalk = require('chalk')

async function register(email, password) {
	try {
		if (!password) {
			throw new Error('Нужно ввести пароль!')
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const user = await User.create({
			email,
			password: hashedPassword,
		})

		const token = generate({ id: user._id })

		console.log(chalk.bgGreen(`Пользователь ${user.email} успешно зарегистрировался`))

		return { token, user }
	} catch (err) {
		if (err.code === 11000) {
			throw new Error('Такой пользователь уже существует!')
		}

		console.log(chalk.bgRed(`При регистрации пошло что-то не так: ${err.message}`))

		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function login(email, password) {
	try {
		const user = await User.findOne({ email })

		if (!user) {
			throw new Error('Пользователь не найден!')
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password)

		if (!isPasswordCorrect) {
			throw new Error('Пароль неверный!')
		}

		console.log(chalk.bgGreen(`Пользователь ${user.email} успешно авторизовался`))

		return { token: generate({ id: user._id }), user }
	} catch (err) {
		console.log(chalk.bgRed(`При авторизации пошло что-то не так: ${err.message}`))
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

module.exports = {
	login,
	register,
}
