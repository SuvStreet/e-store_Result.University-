import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const searchItems =
	({ search, page }) =>
	async (dispatch) => {
		try {
			dispatch({ type: ACTION_TYPE.REQUEST_PRODUCTS_LIST })

			const { error, data } = await request(
				`${URL.SEARCH_PRODUCTS}?search=${search}&page=${page}&limit=5`,
			)

			if (error) {
				dispatch({ type: ACTION_TYPE.REQUEST_PRODUCTS_LIST_ERROR, payload: error })
				return false
			}

			if (page === 1) {
				dispatch({
					type: ACTION_TYPE.REQUEST_PRODUCTS_LIST_SUCCESS,
					payload: data.products,
				})
			} else {
				dispatch({
					type: ACTION_TYPE.REQUEST_PRODUCTS_LIST_SUCCESS,
					payload: data.products,
				})
			}

			return data.lastPage
		} catch (error) {
			console.error('error ', error)
		}
	}
