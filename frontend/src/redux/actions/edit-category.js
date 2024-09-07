import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const editCategory = (categoryId, categoryName) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_EDIT_CATEGORY })

		const { error, data } = await request(
			`${URL.EDIT_CATEGORIES}/${categoryId}`,
			'PUT',
			categoryName,
		)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_EDIT_CATEGORY_ERROR, payload: error })
			return false
		}

		dispatch({ type: ACTION_TYPE.REQUEST_EDIT_CATEGORY_SUCCESS, payload: data.category })
		return true
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_EDIT_CATEGORY_ERROR, payload: error })
		console.error('error: ', error)
	}
}
