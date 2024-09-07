import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const clearCartAsync = (id) => async (dispatch) => {
	try {
		const { error } = await request(`${URL.CART}/${id}`, 'DELETE')

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_CART_ERROR, payload: error })
			return
		}

		dispatch({ type: ACTION_TYPE.CLEAR_CART })
	} catch (error) {
		console.error('error ', error)
	}
}
