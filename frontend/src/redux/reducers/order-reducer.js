import { handleRequestState } from '../../utils'
import { ACTION_TYPE } from '../actions'

const initialState = {
	isLoading: true,
	error: null,
	ordersUser: [],
	ordersAll: [],
}

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.REQUEST_ADD_ORDER_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				ordersUser: [...state.ordersUser, action.payload],
			}

		case ACTION_TYPE.REQUEST_ADD_ORDER:
		case ACTION_TYPE.REQUEST_ADD_ORDER_ERROR:
			return handleRequestState(state, action, {
				request: ACTION_TYPE.REQUEST_ADD_ORDER,
				error: ACTION_TYPE.REQUEST_ADD_ORDER_ERROR,
			})

		case ACTION_TYPE.REQUEST_ORDERS_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				ordersAll: action.payload,
			}

		case ACTION_TYPE.REQUEST_ORDERS:
		case ACTION_TYPE.REQUEST_ORDERS_ERROR:
			return handleRequestState(state, action, {
				request: ACTION_TYPE.REQUEST_ORDERS,
				error: ACTION_TYPE.REQUEST_ORDERS_ERROR,
			})

		case ACTION_TYPE.REQUEST_ORDERS_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				ordersUser: action.payload,
			}

		case ACTION_TYPE.REQUEST_ORDERS_USER:
		case ACTION_TYPE.REQUEST_ORDERS_USER_ERROR:
			return handleRequestState(state, action, {
				request: ACTION_TYPE.REQUEST_ORDERS_USER,
				error: ACTION_TYPE.REQUEST_ORDERS_USER_ERROR,
			})

		default:
			return state
	}
}
