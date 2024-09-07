import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'
import { logout } from './logout'
import { setUser } from './set-user'

export const getUser = () => async (dispatch) => {
	try {
		const { error, data } = await request(URL.USER, 'GET')

		if (error) {
			if (
				error === 'Авторизованного пользователя нет!' ||
				error === 'jwt expired' ||
				error === 'jwt must be provided'
			) {
				dispatch(logout())
				dispatch({
					type: ACTION_TYPE.REQUEST_ERROR,
					payload: 'Требуется авторизация!',
				})
				return
			}

			dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error })
			return
		}

		dispatch({ type: ACTION_TYPE.SET_AUTH })
		dispatch(setUser(data.user))
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error })
		console.error('error ', error)
	}
}
