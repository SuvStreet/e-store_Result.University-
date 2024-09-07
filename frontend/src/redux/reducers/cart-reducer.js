import localStorageService from '../../service/localStorageService'
import { handleRequestState } from '../../utils'
import { ACTION_TYPE } from '../actions'

const initialState = localStorageService.getCart() || {
	id: null,
	isLoading: false,
	error: null,
	items: [],
	totalPrice: 0,
}

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.REQUEST_CLEAR_CART_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				id: null,
				items: [],
				totalPrice: 0,
			}

		case ACTION_TYPE.REQUEST_CART:
		case ACTION_TYPE.REQUEST_CART_ERROR:
			return handleRequestState(state, action, {
				request: ACTION_TYPE.REQUEST_ADD_TO_CART,
				error: ACTION_TYPE.REQUEST_ADD_TO_CART_ERROR,
			})

		case ACTION_TYPE.REQUEST_CART_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				id: action.payload.id,
				items: action.payload.items,
				totalPrice: action.payload.totalPrice,
			}

		case ACTION_TYPE.REQUEST_ADD_TO_CART_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				items: action.payload.items,
				totalPrice: action.payload.totalPrice,
			}

		case ACTION_TYPE.REQUEST_ADD_TO_CART:
		case ACTION_TYPE.REQUEST_ADD_TO_CART_ERROR:
			return handleRequestState(state, action, {
				request: ACTION_TYPE.REQUEST_ADD_TO_CART,
				error: ACTION_TYPE.REQUEST_ADD_TO_CART_ERROR,
			})

		case ACTION_TYPE.ADD_TO_CART:
			return {
				...state,
				items: action.payload.items,
				totalPrice: action.payload.totalPrice,
			}

		case ACTION_TYPE.UPDATE_CART:
			return {
				...state,
				items: action.payload.items,
				totalPrice: action.payload.totalPrice,
			}

		case ACTION_TYPE.CLEAR_CART:
			return {
				...state,
				id: null,
				items: [],
				totalPrice: 0,
			}

		default:
			return state
	}
}
