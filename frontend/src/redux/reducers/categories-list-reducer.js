import { handleRequestState } from '../../utils'
import { ACTION_TYPE } from '../actions'

const initialState = {
	categories: [],
	isLoading: false,
	error: null,
}

export const categoriesListReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.REQUEST_CATEGORIES_LIST:
		case ACTION_TYPE.REQUEST_CATEGORIES_LIST_SUCCESS:
		case ACTION_TYPE.REQUEST_CATEGORIES_LIST_ERROR:
			return handleRequestState(
				state,
				action,
				{
					request: ACTION_TYPE.REQUEST_CATEGORIES_LIST,
					success: ACTION_TYPE.REQUEST_CATEGORIES_LIST_SUCCESS,
					error: ACTION_TYPE.REQUEST_CATEGORIES_LIST_ERROR,
				},
				'categories',
			)

		case ACTION_TYPE.REQUEST_ADD_CATEGORY_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				categories: [...state.categories, action.payload],
			}

		case ACTION_TYPE.REQUEST_ADD_CATEGORY:
		case ACTION_TYPE.REQUEST_ADD_CATEGORY_ERROR:
			return handleRequestState(
				state,
				action,
				{
					request: ACTION_TYPE.REQUEST_ADD_CATEGORY,
					success: ACTION_TYPE.REQUEST_ADD_CATEGORY_SUCCESS,
					error: ACTION_TYPE.REQUEST_ADD_CATEGORY_ERROR,
				},
				'categories',
			)

		case ACTION_TYPE.REQUEST_EDIT_CATEGORY_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				categories: state.categories.map((category) =>
					category.id === action.payload.id ? action.payload : category,
				),
			}

		case ACTION_TYPE.REQUEST_EDIT_CATEGORY:
		case ACTION_TYPE.REQUEST_EDIT_CATEGORY_ERROR:
			return handleRequestState(
				state,
				action,
				{
					request: ACTION_TYPE.REQUEST_EDIT_CATEGORY,
					success: ACTION_TYPE.REQUEST_EDIT_CATEGORY_SUCCESS,
					error: ACTION_TYPE.REQUEST_EDIT_CATEGORY_ERROR,
				},
				'categories',
			)

		case ACTION_TYPE.REMOVE_CATEGORY:
			return {
				...state,
				categories: state.categories.filter((category) => category.id !== action.payload),
			}

		case ACTION_TYPE.RESET_CATEGORIES_ERROR:
			return {
				...state,
				error: null,
			}

		default:
			return state
	}
}
