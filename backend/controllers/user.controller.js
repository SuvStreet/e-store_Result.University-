const User = require('../models/User')
const chalk = require('chalk')
const ROLE = require('../constants/roles')

async function editUser(id, user) {
	try {
		const newUser = await User.findByIdAndUpdate(
			id,
			{ $set: { ...user, login: user.login || 'User' } },
			{
				new: true,
				runValidators: true,
			},
		)

		console.log(chalk.bgGreen(`Пользователь успешно изменён на ${newUser.login}`))

		return newUser
	} catch (err) {
		console.log(
			chalk.bgRed(`При изменении пользователя пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function getUserList(currentUserId) {
	try {
		const users = await User.find({
			_id: { $ne: currentUserId },
		})

		if (!users.length) {
			throw new Error('Пользователи не найдены!')
		}

		console.log(chalk.bgGreen('Пользователи успешно получены'))

		return users
	} catch (err) {
		console.log(
			chalk.bgRed(`При получении пользователей пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

function getRoles() {
	return [
		{
			id: ROLE.ADMIN,
			name: 'Администратор',
		},
		{
			id: ROLE.USER,
			name: 'Пользователь',
		},
	]
}

async function editUserRole(id, role) {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ role_id: role.role_id },
			{
				new: true,
			},
		)

		console.log(
			chalk.bgGreen(`Роль пользователя успешно изменена на ${updatedUser.role_id}`),
		)

		return updatedUser
	} catch (err) {
		console.log(
			chalk.bgRed(`При изменении пользователя пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function deleteUser(id) {
	try {
		const user = await User.findByIdAndDelete(id)

		if (!user) {
			throw new Error('Пользователь не найден!')
		}

		console.log(chalk.bgGreen(`Пользователь ${user.login} успешно удален`))

		return user
	} catch (err) {
		console.log(
			chalk.bgRed(`При удалении пользователя пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

module.exports = {
	editUser,
	getUserList,
	getRoles,
	editUserRole,
	deleteUser,
}
