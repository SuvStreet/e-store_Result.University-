import localStorageService from '../../service/localStorageService'
import { ACTION_TYPE } from './action-type'

export const addToCart =
	({ id }) =>
	(dispatch, getState) => {
		const {
			cart,
			productsList: { products },
		} = getState()

		const {
			name,
			price,
			images: imageUrl,
			discount,
		} = products.find((product) => product.id === id)

		const newItem = {
			id,
			name,
			price,
			imgUrl: imageUrl[0],
			discount,
			totalPrice: Number(((1 - discount / 100) * price).toFixed()),
			quantity: 1,
		}

		const updatedItems = [...cart.items, newItem]

		const totalOrderPrice = updatedItems.reduce(
			(total, item) =>
				total + ((1 - item.discount / 100) * item.price).toFixed() * item.quantity,
			0,
		)
		dispatch({
			type: ACTION_TYPE.ADD_TO_CART,
			payload: { items: updatedItems, totalPrice: totalOrderPrice },
		})
		localStorageService.setCart({
			...cart,
			items: updatedItems,
			totalPrice: totalOrderPrice,
		})
	}
