import { setUser } from './set-user'
import { ACTION_TYPE } from './action-type'
import { request } from '../../utils'
import { logout } from './logout'
import { URL } from '../../constants'
import localStorageService from '../../service/localStorageService'

export const initializeApp = (pathnameCart) => async (dispatch) => {
	dispatch({ type: ACTION_TYPE.REQUEST })

	try {
		// Загрузка данных пользователя
		const userData = await request(URL.USER)

		if (userData.error) {
			if (
				userData.error === 'Авторизованного пользователя нет!' ||
				userData.error === 'jwt expired' ||
				userData.error === 'jwt must be provided'
			) {
				dispatch(logout())
				dispatch({
					type: ACTION_TYPE.REQUEST_ERROR,
					payload: 'Требуется авторизация!',
				})
				return
			}

			dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: userData.error })
			return
		}

		dispatch(setUser(userData.data.user))
		localStorageService.setAuth(true)

		dispatch({ type: ACTION_TYPE.REQUEST_SUCCESS })

		// Загрузка карзины
		if (!pathnameCart) {
			const { error, data } = await request(URL.CART)

			if (error) {
				dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error })
				return
			}

			dispatch({ type: ACTION_TYPE.ADD_TO_CART, payload: data.cart })
		}
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error.message })
	}
}
