import localStorageService from '../../service/localStorageService'
import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'
import { setUser } from './set-user'

export const registration = (arg) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST })

		const { error, data } = await request(URL.REGISTER, 'POST', arg)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error })
			return
		}

		localStorageService.setAuth(true)

		dispatch(setUser(data.user))

		dispatch({ type: ACTION_TYPE.REQUEST_SUCCESS })
		dispatch({ type: ACTION_TYPE.SET_AUTH })
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error })
		console.error('error ', error)
	}
}
