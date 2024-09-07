import localStorageService from '../../service/localStorageService'
import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'
import { setUser } from './set-user'
import { addToCartAsync } from './add-to-cart-async'
import { getCart } from './get-cart'

export const authorization = (arg) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST })

		const { error, data } = await request(URL.AUTHORIZE, 'POST', arg)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error })
			return
		}

		localStorageService.setAuth(true)

		dispatch(setUser(data.user))

		const cartUser = localStorageService.getCart()

		if (cartUser) {
			const products = cartUser.items.map((item) => {
				return {
					item: item.id,
					quantity: item.quantity,
				}
			})
			await dispatch(addToCartAsync(products))
			localStorageService.removeCart()
		} else {
			dispatch(getCart())
		}

		dispatch({ type: ACTION_TYPE.REQUEST_SUCCESS })
		dispatch({ type: ACTION_TYPE.SET_AUTH })
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error })
		console.error('error ', error)
	}
}
