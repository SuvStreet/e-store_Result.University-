import { handleRequestState } from '../../utils'
import { ACTION_TYPE } from '../actions'

const initialState = {
	isLoading: true,
	error: null,
	main: [],
}

export const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.REQUEST_MAIN:
		case ACTION_TYPE.REQUEST_MAIN_SUCCESS:
		case ACTION_TYPE.REQUEST_MAIN_ERROR:
			return handleRequestState(
				state,
				action,
				{
					request: ACTION_TYPE.REQUEST_MAIN,
					success: ACTION_TYPE.REQUEST_MAIN_SUCCESS,
					error: ACTION_TYPE.REQUEST_MAIN_ERROR,
				},
				'main',
			)

		default:
			return state
	}
}
