import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const getOrder =
	({ userId }) =>
	async (dispatch) => {
		try {
			dispatch({ type: ACTION_TYPE.REQUEST_ORDERS_USER })

			const { error, data } = await request(`${URL.ORDER}/${userId}`)

			if (error) {
				dispatch({ type: ACTION_TYPE.REQUEST_ORDERS_USER_ERROR, payload: error })
				return false
			}

			dispatch({ type: ACTION_TYPE.REQUEST_ORDERS_USER_SUCCESS, payload: data.order })

			return true
		} catch (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ORDERS_USER_ERROR, payload: error })
			console.error('error ', error)
		}
	}
