import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'
import { setUser } from './set-user'

export const editUser = (id, newUser) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST })

		const { error, data } = await request(`${URL.USER}/${id}`, 'PUT', newUser)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error })
			return
		}

		dispatch({ type: ACTION_TYPE.REQUEST_SUCCESS })
		dispatch(setUser(data.user))
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error })
	}
}
