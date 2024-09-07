import { handleRequestState } from '../../utils'
import { ACTION_TYPE } from '../actions'

const initialState = {
	products: [],
	minPrice: 0,
	maxPrice: 0,
	brands: [],
	isLoading: true,
	error: null,
}

export const productsListReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.REQUEST_PRODUCTS_LIST:
		case ACTION_TYPE.REQUEST_PRODUCTS_LIST_SUCCESS:
		case ACTION_TYPE.REQUEST_PRODUCTS_LIST_ERROR:
			return handleRequestState(
				state,
				action,
				{
					request: ACTION_TYPE.REQUEST_PRODUCTS_LIST,
					success: ACTION_TYPE.REQUEST_PRODUCTS_LIST_SUCCESS,
					error: ACTION_TYPE.REQUEST_PRODUCTS_LIST_ERROR,
				},
				'products',
			)

		case ACTION_TYPE.ADD_FILTERS:
			return {
				...state,
				minPrice: action.payload.minPrice,
				maxPrice: action.payload.maxPrice,
				brands: action.payload.brands,
			}

		case ACTION_TYPE.REQUEST_ADD_PRODUCT_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
			}

		case ACTION_TYPE.REQUEST_ADD_PRODUCT:
		case ACTION_TYPE.REQUEST_ADD_PRODUCT_ERROR:
			return handleRequestState(
				state,
				action,
				{
					request: ACTION_TYPE.REQUEST_ADD_PRODUCT,
					error: ACTION_TYPE.REQUEST_ADD_PRODUCT_ERROR,
				},
				'products',
			)

		case ACTION_TYPE.REQUEST_EDIT_PRODUCT_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				products: state.products.map((product) => {
					return product.id === action.payload.id ? action.payload : product
				}),
			}

		case ACTION_TYPE.REQUEST_EDIT_PRODUCT:
		case ACTION_TYPE.REQUEST_EDIT_PRODUCT_ERROR:
			return handleRequestState(
				state,
				action,
				{
					request: ACTION_TYPE.REQUEST_EDIT_PRODUCT,
					error: ACTION_TYPE.REQUEST_EDIT_PRODUCT_ERROR,
				},
				'products',
			)

		case ACTION_TYPE.REMOVE_PRODUCT:
			return {
				...state,
				products: state.products.filter((product) => product.id !== action.payload),
			}

		case ACTION_TYPE.RESET_PRODUCT_ERROR:
			return {
				...state,
				error: null,
			}

		default:
			return state
	}
}
