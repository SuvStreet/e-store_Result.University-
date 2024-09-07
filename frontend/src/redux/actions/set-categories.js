import { ACTION_TYPE } from './action-type'

export const setCategories = (categories) => {
	return {
		type: ACTION_TYPE.SET_CATEGORIES,
		payload: categories,
	}
}
