import { handleRequestState } from '../../utils'
import { ACTION_TYPE } from '../actions'

const initialState = {
	id: null,
	email: '',
	login: '',
	imgUserUrl: '',
	roleId: null,
	createdAt: null,
	updatedAt: null,
	users: {
		isLoading: false,
		isRoleUpdating: false,
		error: null,
		users: [],
		roles: [],
	},
}

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			}

		case ACTION_TYPE.RESET_USER:
			return {
				...initialState,
			}

		case ACTION_TYPE.REQUEST_USERS_LIST:
		case ACTION_TYPE.REQUEST_USERS_LIST_SUCCESS:
		case ACTION_TYPE.REQUEST_USERS_LIST_ERROR:
			return {
				...state,
				users: handleRequestState(
					state.users,
					action,
					{
						request: ACTION_TYPE.REQUEST_USERS_LIST,
						success: ACTION_TYPE.REQUEST_USERS_LIST_SUCCESS,
						error: ACTION_TYPE.REQUEST_USERS_LIST_ERROR,
					},
					'users',
				),
			}

		case ACTION_TYPE.REQUEST_EDIT_USER_ROLE_SUCCESS:
			return {
				...state,
				users: {
					...state.users,
					isRoleUpdating: false,
					users: state.users.users.map((user) =>
						user.id === action.payload.id
							? { ...user, roleId: action.payload.roleId }
							: user,
					),
				},
			}

		case ACTION_TYPE.REQUEST_EDIT_USER_ROLE:
			return {
				...state,
				users: {
					...state.users,
					isRoleUpdating: true,
				},
			}

		case ACTION_TYPE.REQUEST_EDIT_USER_ROLE_ERROR:
			return {
				...state,
				users: {
					...state.users,
					isRoleUpdating: false,
					error: action.payload,
				},
			}

		case ACTION_TYPE.SET_ROLES_LIST:
			return {
				...state,
				users: {
					...state.users,
					roles: action.payload,
				},
			}

		default:
			return state
	}
}
