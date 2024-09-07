import { ACTION_TYPE } from '../actions'

const initialState = {
	isLoading: false,
	error: null,
	id: null,
	name: '',
	imageUrl: '',
	description: '',
	categoryId: null,
	brand: '',
	discount: null,
	quantity: null,
	price: null,
	features: {},
	rating: null,
	comments: [],
}

export const singleProductReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.REQUEST_PRODUCT:
			return {
				...state,
				isLoading: true,
			}

		case ACTION_TYPE.REQUEST_PRODUCT_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				...action.payload,
			}

		case ACTION_TYPE.REQUEST_PRODUCT_ERROR:
			return {
				...initialState,
				isLoading: false,
				error: action.payload,
			}

		case ACTION_TYPE.ADD_PRODUCT:
			return {
				...state,
				...action.payload,
			}

		default:
			return state
	}
}
