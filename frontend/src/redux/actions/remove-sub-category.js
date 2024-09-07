import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const removeSubCategory =
	(subCategory_id, nameSubCategory) => async (dispatch) => {
		try {
			dispatch({
				type: ACTION_TYPE.OPEN_MODAL,
				payload: {
					textModal: `Вы действительно хотите удалить "${nameSubCategory}"?`,
					onConfirm: async () => {
						const { error } = await request(
							`${URL.SUB_CATEGORY}/${subCategory_id}`,
							'DELETE',
						)

						if (error) {
							throw new Error(error)
						}

						dispatch({ type: ACTION_TYPE.REMOVE_SUBCATEGORY, payload: subCategory_id })
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
