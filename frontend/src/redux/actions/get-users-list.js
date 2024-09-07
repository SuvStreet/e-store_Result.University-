import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const getUsersList = () => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_USERS_LIST })

		Promise.all([request(URL.USERS_LIST), request(URL.ROLES_LIST)]).then(
			([users, roles]) => {
				if (users.error || roles.error) {
					dispatch({
						type: ACTION_TYPE.REQUEST_USERS_LIST_ERROR,
						payload: users.error || roles.error,
					})
					return
				}

				dispatch({
					type: ACTION_TYPE.REQUEST_USERS_LIST_SUCCESS,
					payload: users.data.users,
				})

				dispatch({
					type: ACTION_TYPE.SET_ROLES_LIST,
					payload: roles.data,
				})
			},
		)
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_USERS_LIST_ERROR, payload: error })
		console.error('error ', error)
	}
}
