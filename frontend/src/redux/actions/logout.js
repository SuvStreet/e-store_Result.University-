import { URL } from '../../constants/url'
import localStorageService from '../../service/localStorageService'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const logout = () => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST })

		const { error } = await request(URL.LOGOUT, 'POST')

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error })
			return
		}

		localStorageService.removeAuthData()

		dispatch({ type: ACTION_TYPE.LOGOUT })
		dispatch({ type: ACTION_TYPE.RESET_USER })
		dispatch({ type: ACTION_TYPE.CLEAR_CART })
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error })
		console.error('error ', error)
	}
}
