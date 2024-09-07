import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const getSubCategoriesList =
	({ id }) =>
	async (dispatch) => {
		try {
			dispatch({ type: ACTION_TYPE.REQUEST_SUBCATEGORIES_LIST })

			let response = null

			if (!id) {
				response = await request(URL.SUB_CATEGORY)
			} else {
				response = await request(`${URL.SUB_CATEGORY}/${id}`)
			}

			const { error, data } = response

			if (error) {
				dispatch({ type: ACTION_TYPE.REQUEST_SUBCATEGORIES_LIST_ERROR, payload: error })
				return false
			}

			dispatch({
				type: ACTION_TYPE.REQUEST_SUBCATEGORIES_LIST_SUCCESS,
				payload: data.subCategories,
			})
			return true
		} catch (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_SUBCATEGORIES_LIST_ERROR, payload: error })
			console.error('error ', error)
		}
	}
