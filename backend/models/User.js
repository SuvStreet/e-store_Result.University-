const mongoose = require('mongoose')
const validator = require('validator')
const roles = require('../constants/roles')

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: (email) => {
				return validator.isEmail(email)
			},
			message: (props) => `${props.value} эта почта не корректна!`,
		},
	},
	password: {
		type: String,
		required: true,
	},
	login: {
		type: String,
		default: 'User',
	},
	img_user_url: {
		type: String,
		validate: {
			validator: validator.isURL,
			message: 'Картинка должна быть ссылкой!',
		},
		default:
			'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_white_tone_icon_159368.png',
	},
	role_id: {
		type: Number,
		default: roles.USER,
	}
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
