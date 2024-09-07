import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../../../components/button/Button'
import { Feature } from '../feature/Feature'
import { addToCart, addToCartAsync } from '../../../../redux/actions'
import { selectCart, selectUser } from '../../../../redux/selectors'
import { formatPrice } from '../../../../utils'
import { Loader } from '../../../../components'

import styled from 'styled-components'

const CardContainer = ({ className, product }) => {
	const dispatch = useDispatch()
	const cart = useSelector(selectCart)
	const navigate = useNavigate()
	const userId = useSelector(selectUser).id
	const [indexImage, setIndexImage] = useState(0)
	const { description, discount, features, price, id, images, name, quantity } = product

	const handelAddToCart = () => {
		if (cart.items.find((item) => item.id === id)) {
			navigate('/cart')
		} else {
			userId
				? dispatch(addToCartAsync([{ item: id, quantity: 1 }]))
				: dispatch(addToCart({ id }))
		}
	}

	const inCart = cart.items.find((item) => item.id === id)

	return (
		<div className={className}>
			<div className='container'>
				<div className='imgContainer'>
					<div className='imgProductFull'>
						<img src={images[indexImage]} alt='photo' />
					</div>
					<div className='imgProduct'>
						{images.map((img, index) => (
							<img
								src={img}
								alt='photo'
								key={index}
								onClick={() => setIndexImage(index)}
							/>
						))}
					</div>
				</div>
				<div className='infoProduct'>
					<h1 className='nameProduct'>{name}</h1>
					<div className='containerProduct'>
						<div className='fastInfoProduct'>
							<Feature features={features} />
							<div className='price__container'>
								<div className='priceProduct'>
									<div className='price__price'>
										{discount === 0
											? formatPrice(price)
											: formatPrice(price - ((price * discount) / 100).toFixed())}{' '}
										₽
									</div>
									{discount !== 0 && (
										<div className='price__noDiscount'>{formatPrice(price)} ₽</div>
									)}
								</div>
								<Button
									className='priceButton'
									height='auto'
									width='300px'
									solid={inCart ? '' : 'green'}
									onClick={() => handelAddToCart()}
									disabled={quantity === 0 || cart.isLoading}
								>
									{quantity === 0 ? (
										'Нет в наличии'
									) : cart.isLoading ? (
										<Loader />
									) : inCart ? (
										'В корзине'
									) : (
										'В корзину'
									)}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='descriptionProduct'>
				<h2 className='description__title'>О товаре</h2>
				<div className='description__text'>{description}</div>
			</div>
			<div>
				<h2 className='description__title'>Характеристики</h2>
				<Feature features={features} noTitle />
			</div>
		</div>
	)
}

CardContainer.propTypes = {
	className: PropTypes.string.isRequired,
	product: PropTypes.object.isRequired,
}

export const Card = styled(CardContainer)`
	display: flex;
	flex-direction: column;

	justify-content: space-between;
	gap: 10px;

	.container {
		display: flex;
		align-items: flex-start;
		gap: 20px;
	}

	.imgContainer {
		position: sticky;
		top: calc(127px + 20px);
		width: 600px;
		max-width: 100%;
		overflow: hidden;

		.imgProductFull {
			display: flex;
			justify-content: center;
			height: 300px;
			max-width: 600px;
			object-fit: contain;
			border-radius: 10px;
		}

		.imgProduct {
			display: flex;
			height: 100px;
			flex-wrap: nowrap;
			gap: 10px;
			margin-top: 10px;
			cursor: pointer;
			overflow-x: auto;
			padding: 0 10px;
		}

		img {
			max-width: 100%;
			object-fit: cover;
			border-radius: 10px;
		}
	}

	.infoProduct {
		width: 100%;
	}

	.nameProduct {
		text-align: start;
		margin: 0 20px;
	}

	.fastInfoProduct {
		display: flex;
		justify-content: space-between;
		gap: 10px;
	}

	@media (max-width: 1200px) {
		.fastInfoProduct {
			flex-direction: column;
			gap: 0;
		}
	}

	.price__container {
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		.priceProduct {
			display: flex;
			justify-content: flex-end;
			gap: 10px;

			.price__price {
				font-size: 40px;
				font-weight: bold;
			}

			.price__noDiscount {
				font-size: 14px;
				color: #5e5e5e;
				text-decoration: line-through;
				margin-top: 10px;
			}
		}
	}

	.containerProduct {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.featureProduct {
		width: 50%;
	}

	.description__title {
		text-align: start;
		margin-bottom: 15px;
	}

	.description__text {
		text-align: start;
	}
`

CardContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
