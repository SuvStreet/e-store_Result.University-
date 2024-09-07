export const handleRequestState = (state, action, options = {}, key = 'data') => {
	switch (action.type) {
		case options.request:
			return { ...state, isLoading: true }
		case options.success:
			return { ...state, isLoading: false, error: null, [key]: action.payload }
		case options.error:
			return { ...state, isLoading: false, error: action.payload }
		default:
			return state
	}
}
