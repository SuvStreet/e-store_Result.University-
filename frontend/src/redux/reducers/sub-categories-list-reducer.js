import { handleRequestState } from '../../utils'
import { ACTION_TYPE } from '../actions'

const initialState = {
	subCategories: [],
	isLoading: false,
	error: null,
}

export const subCategoriesListReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.REQUEST_SUBCATEGORIES_LIST:
		case ACTION_TYPE.REQUEST_SUBCATEGORIES_LIST_SUCCESS:
		case ACTION_TYPE.REQUEST_SUBCATEGORIES_LIST_ERROR:
			return handleRequestState(
				state,
				action,
				{
					request: ACTION_TYPE.REQUEST_SUBCATEGORIES_LIST,
					success: ACTION_TYPE.REQUEST_SUBCATEGORIES_LIST_SUCCESS,
					error: ACTION_TYPE.REQUEST_SUBCATEGORIES_LIST_ERROR,
				},
				'subCategories',
			)

		case ACTION_TYPE.REQUEST_ADD_SUBCATEGORY_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				subCategories: [...state.subCategories, action.payload],
			}

		case ACTION_TYPE.REQUEST_ADD_SUBCATEGORY:
		case ACTION_TYPE.REQUEST_ADD_SUBCATEGORY_ERROR:
			return handleRequestState(
				state,
				action,
				{
					request: ACTION_TYPE.REQUEST_ADD_SUBCATEGORY,
					success: ACTION_TYPE.REQUEST_ADD_SUBCATEGORY_SUCCESS,
					error: ACTION_TYPE.REQUEST_ADD_SUBCATEGORY_ERROR,
				},
				'subCategories',
			)

		case ACTION_TYPE.REQUEST_EDIT_SUBCATEGORY_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				subCategories: state.subCategories.map((subCategory) =>
					subCategory.id === action.payload.id ? action.payload : subCategory,
				),
			}

		case ACTION_TYPE.REQUEST_EDIT_SUBCATEGORY:
		case ACTION_TYPE.REQUEST_EDIT_SUBCATEGORY_ERROR:
			return handleRequestState(
				state,
				action,
				{
					request: ACTION_TYPE.REQUEST_EDIT_SUBCATEGORY,
					success: ACTION_TYPE.REQUEST_EDIT_SUBCATEGORY_SUCCESS,
					error: ACTION_TYPE.REQUEST_EDIT_SUBCATEGORY_ERROR,
				},
				'subCategories',
			)

		case ACTION_TYPE.REMOVE_SUBCATEGORY:
			return {
				...state,
				subCategories: state.subCategories.filter(
					(subCategory) => subCategory.id !== action.payload,
				),
			}

		case ACTION_TYPE.RESET_SUBCATEGORY_ERROR:
			return {
				...state,
				error: null,
			}

		default:
			return state
	}
}
