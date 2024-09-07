const SET_AUTH = 'set-auth'

const setAuth = (auth) => {
	localStorage.setItem(SET_AUTH, auth)
}

const getAuth = () => {
	return localStorage.getItem(SET_AUTH)
}

const removeAuthData = () => {
	localStorage.removeItem(SET_AUTH)
}

const setCart = (cart) => {
	localStorage.setItem('cart', JSON.stringify(cart))
}

const getCart = () => {
	return JSON.parse(localStorage.getItem('cart'))
}

const removeCart = () => {
	localStorage.removeItem('cart')
}

const localStorageService = {
	removeAuthData,
	getAuth,
	setAuth,
	setCart,
	getCart,
	removeCart,
}

export default localStorageService
