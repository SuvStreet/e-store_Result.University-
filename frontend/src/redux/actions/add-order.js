import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const addOrder = (cart) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_ADD_ORDER })

		const { error, data } = await request(URL.ORDER_CREATE, 'POST', {
			cart: {
				id: cart.id,
				items: cart.items,
				totalPrice: cart.totalPrice,
			},
		})

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ADD_ORDER_ERROR, payload: error })
			return false
		}

		dispatch({ type: ACTION_TYPE.REQUEST_ADD_ORDER_SUCCESS, payload: data.order })
		return true
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ADD_ORDER_ERROR, payload: error })
		console.error('error: ', error)
	}
}
