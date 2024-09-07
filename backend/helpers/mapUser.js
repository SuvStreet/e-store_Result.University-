module.exports = function (userDb) {
	return {
		id: userDb._id,
		login: userDb.login,
		imgUserUrl: userDb.img_user_url,
		email: userDb.email,
		roleId: userDb.role_id,
		createdAt: userDb.createdAt,
		updatedAt: userDb.updatedAt,
	}
}
