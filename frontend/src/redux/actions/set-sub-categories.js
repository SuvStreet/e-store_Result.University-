import { ACTION_TYPE } from './action-type'

export const setSubCategories = (subCategories) => {
	return {
		type: ACTION_TYPE.SET_SUB_CATEGORIES,
		payload: subCategories,
	}
}
