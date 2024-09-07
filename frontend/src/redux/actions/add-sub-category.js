import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const addSubCategory = (subCategory) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_ADD_SUBCATEGORY })

		const { error, data } = await request(URL.ADD_SUB_CATEGORY, 'POST', subCategory)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ADD_SUBCATEGORY_ERROR, payload: error })
			return false
		}

		dispatch({ type: ACTION_TYPE.REQUEST_ADD_SUBCATEGORY_SUCCESS, payload: data.subCategory })
		return true
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ADD_SUBCATEGORY_ERROR, payload: error })
		console.error('error: ', error)
	}
}
