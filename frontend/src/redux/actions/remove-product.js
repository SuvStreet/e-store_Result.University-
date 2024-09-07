import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const removeProduct = (product_id, nameProduct) => async (dispatch) => {
	try {
		dispatch({
			type: ACTION_TYPE.OPEN_MODAL,
			payload: {
				textModal: `Вы действительно хотите удалить "${nameProduct}"?`,
				onConfirm: async () => {
					const { error } = await request(`${URL.PRODUCTS}/${product_id}`, 'DELETE')

					if (error) {
						throw new Error(error)
					}

					dispatch({ type: ACTION_TYPE.REMOVE_PRODUCT, payload: product_id })
					dispatch({ type: ACTION_TYPE.CLOSE_MODAL })
				},
				onCancel: () => {
					dispatch({ type: ACTION_TYPE.CLOSE_MODAL })
				},
			},
		})
	} catch (error) {
		console.error('error: ', error)
	}
}
