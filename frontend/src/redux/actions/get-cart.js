import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const getCart = () => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_CART })

		const { error, data } = await request(URL.CART)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_CART_ERROR, payload: error })
			return false
		}

		dispatch({ type: ACTION_TYPE.REQUEST_CART_SUCCESS, payload: data.cart })
		return true
	} catch (error) {
		console.error('error ', error)
	}
}
