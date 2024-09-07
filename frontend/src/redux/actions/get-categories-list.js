import { URL } from '../../constants/'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const getCategoriesList = () => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_CATEGORIES_LIST })

		const { error, data } = await request(URL.CATEGORIES)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_CATEGORIES_LIST_ERROR, payload: error })
			return
		}

		dispatch({
			type: ACTION_TYPE.REQUEST_CATEGORIES_LIST_SUCCESS,
			payload: data.categories,
		})
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_CATEGORIES_LIST_ERROR, payload: error })
		console.error('error ', error)
	}
}
