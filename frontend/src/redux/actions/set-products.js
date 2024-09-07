import { ACTION_TYPE } from './action-type'

export const setProducts = (payload) => {
	return {
		type: ACTION_TYPE.SET_PRODUCTS,
		payload,
	}
}
