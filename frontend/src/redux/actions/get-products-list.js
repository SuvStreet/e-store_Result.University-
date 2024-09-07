import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const getProductsList =
	({ subCatId = null, page = 1 }) =>
	async (dispatch) => {
		try {
			dispatch({ type: ACTION_TYPE.REQUEST_PRODUCTS_LIST })

			let response = null

			if (!subCatId) {
				response = await request(`${URL.PRODUCTS}?page=${page}`)
			} else {
				response = await request(`${URL.PRODUCTS_LIST}/${subCatId}?page=${page}`)
			}

			const { error, data } = response

			if (error) {
				dispatch({ type: ACTION_TYPE.REQUEST_PRODUCTS_LIST_ERROR, payload: error })
				return
			}

			dispatch({
				type: ACTION_TYPE.REQUEST_PRODUCTS_LIST_SUCCESS,
				payload: data.products,
			})

			dispatch({
				type: ACTION_TYPE.ADD_FILTERS,
				payload: {
					minPrice: data.minPrice,
					maxPrice: data.maxPrice,
					brands: data.brand,
				},
			})

			return data.lastPage
		} catch (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_PRODUCTS_LIST_ERROR, payload: error })
			console.error('error: ', error)
		}
	}
