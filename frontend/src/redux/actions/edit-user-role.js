import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const editUserRole = (id, newRoleId) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_EDIT_USER_ROLE })

		const { error, data } = await request(`${URL.USER_ROLE}/${id}`, 'PUT', {
			roleId: Number(newRoleId),
		})

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_EDIT_USER_ROLE_ERROR, payload: error })
			return false
		}

		dispatch({ type: ACTION_TYPE.REQUEST_EDIT_USER_ROLE_SUCCESS, payload: data.user })
		return true
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_EDIT_USER_ROLE_ERROR, payload: error })
	}
}
