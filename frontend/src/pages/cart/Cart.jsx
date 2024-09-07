import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Button, Error, FormError, Loader, QuantitySelector } from '../../components'
import { selectCart, selectOrder, selectUser } from '../../redux/selectors'
import { formatPrice } from '../../utils'
import { addOrder, clearCart, clearCartAsync, getCart } from '../../redux/actions'

import styled from 'styled-components'

const CartContainer = ({ className }) => {
	const dispatch = useDispatch()
	const cart = useSelector(selectCart)
	const order = useSelector(selectOrder)
	const userId = useSelector(selectUser).id
	const navigate = useNavigate()
	const [isLoginCart, setIsLoginCart] = useState(true)

	useEffect(() => {
		if (!userId) return
		dispatch(getCart()).then((responseOk) => {
			if (responseOk) setIsLoginCart(false)
		})
	}, [dispatch, userId])

	const handleClearCart = (cartId) => {
		userId ? dispatch(clearCartAsync(cartId)) : dispatch(clearCart())
	}

	const handleOrder = () => {
		!userId
			? navigate('/authorize')
			: dispatch(addOrder(cart)).then((responseOk) => {
					if (responseOk) {
						dispatch(clearCart())
					}
			  })
	}

	if (isLoginCart) return <Loader fontSize='150px' />

	if (cart.items.length === 0) {
		return (
			<div className={`${className} cart-empty`}>
				<Error titleError='Корзина пуста' cartEmpty />
			</div>
		)
	}

	return (
		<div className={className}>
			<h1>Оформление заказа</h1>
			<div className='container'>
				<div className='container-cart'>
					<div className='cart'>
						<div className='cart-header'>
							<h3>Корзина</h3>
							<Button solid='red' width='40%' onClick={() => handleClearCart(cart.id)}>
								Очистить корзину
							</Button>
						</div>
						<div className='cards-products'>
							<div className='cards'>
								{cart.items.map((item) => (
									<div key={item.id} className='card'>
										<div className='card-img cell'>
											<img src={item.imgUrl} alt='photo' />
										</div>
										<Link to={`/products/${item.id}`} className='card-name cell'>
											<span>{item.name}</span>
										</Link>
										<div className='card-price cell'>
											<span>{formatPrice(item.price)} ₽</span>
										</div>
										<QuantitySelector
											isLoading={cart.isLoading}
											id={item.id}
											cartId={cart.id}
											quantity={item.quantity}
											quantityProductsCart={cart.items.length}
											maxQuantityProducts={10}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className='container-totalPrice'>
					<div className='sumTotal'>
						<h3>Итого:</h3>
						<span className='totalPrice'>{formatPrice(cart.totalPrice)} ₽</span>
					</div>
					<div className='order'>
						<h3>Стоимость товаров:</h3>
						<span
							className={`price ${
								cart.items.some((item) => item.discount !== 0) && 'crossedText'
							}`}
						>
							{formatPrice(
								cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
							)}{' '}
							₽
						</span>
					</div>
					<div className='container-discount'>
						<h3>Скидка:</h3>
						{cart.items.map((item, index) => (
							<div key={item.id} className='discount'>
								<p>Скидка на {index + 1} товар:</p>
								<span className='price'>
									-{' '}
									{formatPrice(
										((item.price * item.discount) / 100).toFixed() * item.quantity,
									)}{' '}
									₽
								</span>
							</div>
						))}
					</div>
					<Button solid='green' disabled={order.isLoading} onClick={() => handleOrder()}>
						{userId ? (
							order.isLoading ? (
								<Loader />
							) : (
								'Оформить заказ'
							)
						) : (
							'Авторизуйтесь, что бы сделать заказ'
						)}
					</Button>
					{order.error && <FormError>{order.error}</FormError>}
				</div>
			</div>
		</div>
	)
}

export const Cart = styled(CartContainer)`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	max-width: 1200px;

	h1 {
		text-align: start;
	}

	img {
		max-width: 100%;
		object-fit: cover;
	}

	.cell {
		flex: 1;
	}

	&.cart-empty {
		margin: auto 0;
		font-weight: bold;
	}

	.container {
		display: flex;
		justify-content: space-between;
		gap: 20px;

		h3 {
			font-weight: 400;
			text-align: start;
		}
	}

	.container-cart {
		display: flex;
		flex-direction: column;
		gap: 20px;
		flex: 2;

		.cart {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 10px;
			background-color: #313131;
			border: 1px solid #5e5e5e;
			border-radius: 10px;
			padding: 20px;

			.cart-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 20px;
				border-bottom: 1px solid #5e5e5e;
				padding-bottom: 10px;
			}
		}

		.cards-products {
			.cards {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex-wrap: wrap;
				gap: 20px;

				.card {
					display: flex;
					justify-content: space-between;
					align-items: center;
					gap: 20px;

					.card-img {
						max-width: 50px;
						max-height: 50px;
						overflow: hidden;
						border-radius: 10px;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					button {
						max-width: 100px;
					}
				}
			}
		}
	}

	.container-totalPrice {
		display: flex;
		flex-direction: column;
		gap: 10px;
		border: 1px solid #5e5e5e;
		border-radius: 10px;
		padding: 20px;
		flex: 1;

		.sumTotal {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			border-bottom: 1px solid #5e5e5e;
		}

		.totalPrice {
			font-size: 35px;
			font-weight: bold;
		}

		.container-discount {
			h3 {
				border-bottom: 1px solid #5e5e5e;
				padding-bottom: 10px;
				margin-bottom: 10px;
			}

			.discount {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				gap: 5px;
			}
		}

		.order {
			display: flex;
			justify-content: space-between;

			h3 {
				font-size: 15px;
				font-weight: 400;
			}

			.price {
				text-align: end;
				width: 35%;
			}

			.crossedText {
				text-decoration: line-through;
			}
		}
	}
`

CartContainer.propTypes = {
	className: PropTypes.string,
}
