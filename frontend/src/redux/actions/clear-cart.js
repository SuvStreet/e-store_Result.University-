import localStorageService from '../../service/localStorageService'
import { ACTION_TYPE } from './action-type'

export const clearCart = () => {
	localStorageService.removeCart()
	return {
		type: ACTION_TYPE.CLEAR_CART,
	}
}
