import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const increaseQuantityAsync = (cartId, productId) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_ADD_TO_CART })

		const { data, error } = await request(
			`${URL.UPDATE_CART}/${cartId}?type=plus`,
			'PUT',
			{
				product_id: productId,
			},
		)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ADD_TO_CART_ERROR, payload: error })
			return
		}

		dispatch({ type: ACTION_TYPE.REQUEST_ADD_TO_CART_SUCCESS, payload: data.cart })
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ADD_TO_CART_ERROR, payload: error })
		console.error('error ', error)
	}
}
