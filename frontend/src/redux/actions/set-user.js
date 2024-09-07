import { ACTION_TYPE } from './action-type'

export const setUser = (payload) => {
	return {
		type: ACTION_TYPE.SET_USER,
		payload,
	}
}
