import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const getProduct = (id) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_PRODUCT })

		const { error, data } = await request(`${URL.PRODUCTS}/${id}`)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_PRODUCT_ERROR, payload: error })
			return
		}

		dispatch({ type: ACTION_TYPE.REQUEST_PRODUCT_SUCCESS, payload: data.product })
	} catch (error) {
		console.error('error ', error)
	}
}
