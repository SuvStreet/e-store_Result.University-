import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { Button } from '../button/Button'
import {
	decreaseQuantity,
	increaseQuantity,
	removeItemFromCart,
	increaseQuantityAsync,
	decreaseQuantityAsync,
	removeItemFromCartAsync,
} from '../../redux/actions'

import styled from 'styled-components'

const QuantitySelectorContainer = ({
	className,
	id,
	cartId,
	quantity,
	quantityProductsCart,
	maxQuantityProducts,
	isLoading,
}) => {
	const dispatch = useDispatch()

	const handleIncrease = () => {
		cartId ? dispatch(increaseQuantityAsync(cartId, id)) : dispatch(increaseQuantity(id))
	}

	const handleDecrease = () => {
		if (quantity === 1) return
		cartId ? dispatch(decreaseQuantityAsync(cartId, id)) : dispatch(decreaseQuantity(id))
	}

	const handleRemove = () => {
		cartId
			? dispatch(removeItemFromCartAsync(cartId, id))
			: dispatch(removeItemFromCart(id))
	}

	return (
		<div className={className}>
			<Button
				className='quantity-selector__item'
				disabled={quantity === 1 || isLoading}
				onClick={handleDecrease}
			>
				-
			</Button>
			<span className='quantity-selector__item'>{quantity}</span>
			<Button
				className='quantity-selector__item'
				disabled={maxQuantityProducts === quantity || isLoading}
				onClick={handleIncrease}
			>
				+
			</Button>
			{quantityProductsCart > 1 && (
				<Button
					className='quantity-selector__item quantity-selector__item--remove'
					solid='red'
					onClick={handleRemove}
					disabled={isLoading}
				>
					x
				</Button>
			)}
		</div>
	)
}

export const QuantitySelector = styled(QuantitySelectorContainer)`
	display: flex;

	.quantity-selector__item {
		width: 30px;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.quantity-selector__item:nth-child(2) {
		margin: 0 5px;
	}

	.quantity-selector__item--remove {
		margin-left: 5px;
	}
`

QuantitySelectorContainer.propTypes = {
	className: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	cartId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	quantity: PropTypes.number.isRequired,
	quantityProductsCart: PropTypes.number.isRequired,
	maxQuantityProducts: PropTypes.number.isRequired,
	isLoading: PropTypes.bool.isRequired,
}
