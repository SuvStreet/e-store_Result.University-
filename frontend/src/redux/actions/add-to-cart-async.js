import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const addToCartAsync = (products) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_ADD_TO_CART })

		const { error, data } = await request(URL.ADD_CART, 'POST', {
			products,
		})

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ADD_TO_CART_ERROR, payload: error })
			return false
		}

		dispatch({ type: ACTION_TYPE.REQUEST_ADD_TO_CART_SUCCESS, payload: data.cart })
		return true
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ADD_TO_CART_ERROR, payload: error })
		console.error('error ', error)
	}
}
