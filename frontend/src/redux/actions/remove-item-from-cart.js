import localStorageService from '../../service/localStorageService'
import { ACTION_TYPE } from './action-type'

export const removeItemFromCart = (id) => (dispatch, getState) => {
	const { cart } = getState()

	const updatedItems = cart.items.filter((item) => item.id !== id)

	const totalOrderPrice = updatedItems.reduce((total, item) => total + item.totalPrice, 0)

	dispatch({
		type: ACTION_TYPE.UPDATE_CART,
		payload: {
			items: updatedItems,
			totalPrice: totalOrderPrice,
		},
	})

	localStorageService.setCart({
		...cart,
		items: updatedItems,
		totalPrice: totalOrderPrice,
	})
}
