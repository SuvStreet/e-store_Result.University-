import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const getOrders =
	({ page = 1 }) =>
	async (dispatch) => {
		try {
			dispatch({ type: ACTION_TYPE.REQUEST_ORDERS })

			const { error, data } = await request(`${URL.ORDER}?page=${page}`)

			if (error) {
				dispatch({ type: ACTION_TYPE.REQUEST_ORDERS_ERROR, payload: error })
				return false
			}

			dispatch({ type: ACTION_TYPE.REQUEST_ORDERS_SUCCESS, payload: data.orders })

			return data.lastPage
		} catch (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ORDERS_ERROR, payload: error })
			console.error('error ', error)
		}
	}
