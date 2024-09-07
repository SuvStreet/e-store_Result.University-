import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const getMain = () => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_MAIN })

		const { error, data } = await request(URL.MAIN)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_MAIN_ERROR, payload: error })
			return false
		}

		dispatch({ type: ACTION_TYPE.REQUEST_MAIN_SUCCESS, payload: data.main })

		return true
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_MAIN_ERROR, payload: error })
		console.error('error ', error)
	}
}
