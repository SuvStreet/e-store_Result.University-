import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Error, Loader, Pagination } from '../../../../../../components'
import { getOrders } from '../../../../../../redux/actions/get-orders'
import { selectOrder } from '../../../../../../redux/selectors'
import { formatPrice } from '../../../../../../utils'

import styled from 'styled-components'

const OrdersContainer = ({ className }) => {
	const dispatch = useDispatch()
	const { ordersAll, error, isLoading } = useSelector(selectOrder)
	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)

	useEffect(() => {
		dispatch(getOrders({ page })).then((lastPage) => setLastPage(lastPage))
	}, [dispatch, page])

	if (isLoading) {
		return <Loader fontSize='150px' />
	}

	if (error) {
		return <Error titleError={error} />
	}

	return (
		<div className={className}>
			{ordersAll.length !== 0 ? (
				ordersAll.map((order) => (
					<div key={order.id} className='order'>
						<div className='user'>
							<img src={order.userId.img_user_url} alt={order.userId.login} />
							<div className='user-info'>
								<span className='login'>{order.userId.login}</span>
								<span className='email'>{order.userId.email}</span>
							</div>
						</div>

						<div className='items'>
							{order.items.map((item) => (
								<div key={item.id} className='item'>
									<img src={item.img} alt={item.name} />
									<div className='item-info'>
										<span className='name'>{item.name}</span>
										<span className='price'>
											{formatPrice(item.price)} ₽{' '}
											{item.discount > 0 && `(-${item.discount}%)`}
										</span>
										<span className='quantity'>Количество: {item.quantity}</span>
									</div>
								</div>
							))}
						</div>

						<div className='total'>Общая сумма: {formatPrice(order.totalPrice)} ₽</div>
					</div>
				))
			) : (
				<p>Заказы отсутствуют</p>
			)}
			{lastPage > 1 && <Pagination page={page} setPage={setPage} lastPage={lastPage} />}
		</div>
	)
}

export const Orders = styled(OrdersContainer)`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;

	.order {
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 15px;
		background-color: #2b2b2b;

		.user {
			display: flex;
			align-items: center;
			gap: 10px;

			img {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				object-fit: cover;
			}

			.user-info {
				display: flex;
				flex-direction: column;

				.login {
					font-weight: 600;
					font-size: 18px;
				}

				.email {
					font-size: 14px;
					color: #777;
				}
			}
		}

		.items {
			display: flex;
			flex-wrap: wrap;
			gap: 20px;

			.item {
				display: flex;
				max-width: 260px;
				gap: 10px;
				align-items: center;

				img {
					width: 100px;
					height: 100px;
					border-radius: 8px;
					object-fit: cover;
				}

				.item-info {
					display: flex;
					flex-direction: column;
					gap: 5px;

					.name {
						font-weight: 600;
					}

					.price {
						color: #ff5c5c;
						font-weight: 600;
					}

					.quantity {
						font-size: 14px;
						color: #777;
					}
				}
			}
		}

		.total {
			margin-top: 10px;
			font-size: 18px;
			font-weight: bold;
		}
	}
`

OrdersContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
