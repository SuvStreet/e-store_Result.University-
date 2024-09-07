import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const removeCategory = (category_id, nameCategory) => async (dispatch) => {
	try {
		dispatch({
			type: ACTION_TYPE.OPEN_MODAL,
			payload: {
				textModal: `Вы действительно хотите удалить "${nameCategory}"?`,
				onConfirm: async () => {
					dispatch({
						type: ACTION_TYPE.OPEN_MODAL,
						payload: {
							textModal: `Вы также удалите все продукты из этой категории. Продолжить?`,
							onConfirm: async () => {
								const { error } = await request(`${URL.CATEGORIES}/${category_id}`, 'DELETE')
								if (error) {
									throw new Error(error)
								}
								dispatch({ type: ACTION_TYPE.REMOVE_CATEGORY, payload: category_id })
								dispatch({ type: ACTION_TYPE.CLOSE_MODAL })
							},
						},
					})
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
