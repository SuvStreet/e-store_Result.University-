import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const editProduct = (id, product) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_EDIT_PRODUCT })

		const { error, data } = await request(`${URL.EDIT_PRODUCTS}/${id}`, 'PUT', product)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_EDIT_PRODUCT_ERROR, payload: error })
			return false
		}

		dispatch({ type: ACTION_TYPE.REQUEST_EDIT_PRODUCT_SUCCESS, payload: data.product })
		return true
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_EDIT_PRODUCT_ERROR, payload: error })
		console.error('error: ', error)
	}
}
