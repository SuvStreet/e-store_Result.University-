import PropsTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectAppError,
	selectAppIsLoading,
	selectOrder,
	selectUser,
} from '../../redux/selectors'
import { Button, Error, H2, Loader } from '../../components'

import { formatPrice, transformDate } from '../../utils'
import { ROLE } from '../../constants'
import { logout, getOrder } from '../../redux/actions'
import { Link, Outlet, useMatch, useNavigate } from 'react-router-dom'

import styled from 'styled-components'

const ProfileContainer = ({ className }) => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const isLoading = useSelector(selectAppIsLoading)
	const error = useSelector(selectAppError)
	const {
		ordersUser,
		isLoading: isLoadingOrder,
		error: errorOrder,
	} = useSelector(selectOrder)
	const navigate = useNavigate()
	const isEdit = !!useMatch('/profile/:id/edit')

	useEffect(() => {
		if (user.id) {
			dispatch(getOrder({ userId: user.id }))
		}
	}, [dispatch, user.id])

	const handleLogout = () => {
		dispatch(logout())
	}

	const handleEdit = () => {
		navigate(`/profile/${user.id}/edit`)
	}

	if (isLoading && !isEdit) {
		return <Loader fontSize='150px' />
	}

	if (error && !isEdit) {
		return <Error titleError={error} noAccess />
	}

	if (isEdit) {
		return <Outlet />
	}

	return (
		<div className={className}>
			<div className='profile__container'>
				<div className='profile__photo'>
					<img src={user.imgUserUrl} alt='photo' />
				</div>
				<div className='profile__title-container'>
					<div className='profile__title-info'>
						<H2 className='profile__title'>О себе</H2>
						<Button className='profile__button' onClick={() => handleEdit()}>
							Редактировать
						</Button>
						<Button
							className='profile__button'
							solid='red'
							onClick={() => handleLogout()}
						>
							Выйти
						</Button>
					</div>
					<div className='profile__info'>
						<div className='profile__details'>
							<span>Имя: </span>
							{user.login}
						</div>
						<div className='profile__details'>
							<span>Роль: </span>
							{user.roleId === ROLE.ADMIN ? (
								<>
									<p>Администратор</p>
									<Link className='admin' to={`/admin`}>
										Панель администратора
									</Link>
								</>
							) : (
								<p>Пользователь</p>
							)}
						</div>
						<div className='profile__details'>
							<span>Почта: </span>
							{user.email}
						</div>
						<div className='profile__details'>
							<span>Создание: </span>
							{transformDate(user.createdAt)}
						</div>
						<div className='profile__details'>
							<span>Обновление: </span>
							{transformDate(user.updatedAt)}
						</div>
					</div>
				</div>
			</div>
			<div className='profile__history'>
				<H2 className='profile__title'>История покупок</H2>
				{isLoadingOrder ? (
					<Loader />
				) : ordersUser.length !== 0 ? (
					<div className='profile__orders'>
						{ordersUser.map((order) => (
							<div className='profile__order' key={order.id}>
								<div className='profile__order-info'>
									<span className='profile__order-number'>Заказ No {order.id}</span>
									<span className='profile__order-date'>
										{transformDate(order.createdAt)}
									</span>
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

								<div className='total'>
									Общая сумма: {formatPrice(order.totalPrice)} ₽
								</div>
							</div>
						))}
					</div>
				) : (
					<div className='profile__orders'>
						<Error titleError={'Заказы отсутствуют!'} noAccess />
					</div>
				)}
				{errorOrder && <Error titleError={errorOrder} />}
			</div>
		</div>
	)
}

export const Profile = styled(ProfileContainer)`
	width: 100%;

	.profile__container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		margin: 20px 0;

		.profile__photo {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 200px;
			height: 200px;
			overflow: hidden;
			border-radius: 50%;
			border: 1px solid #5e5e5e;
			box-shadow: 0 0 5px 5px #5e5e5e;
			margin: 0 20px;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.profile__title-container {
			display: flex;
			flex: 1;
			flex-direction: column;
			align-items: flex-start;

			.profile__title-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				gap: 20px;
				margin-bottom: 20px;

				.profile__title {
					width: 100%;
					text-align: start;
					margin-bottom: 0;
				}
			}

			.profile__info {
				width: 100%;
				font-size: 18px;
				text-align: start;

				border: 1px solid #5e5e5e;
				border-radius: 10px;
				padding: 20px;

				.profile__details {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					gap: 10px;

					.admin {
						display: block;
						color: #007bff;
						text-decoration: underline;
						margin-left: auto;
					}
				}

				.profile__details span {
					font-weight: 500;
					color: #5e5e5e;
				}
			}
		}
	}

	.profile__history {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 20px;
		border: 1px solid #5e5e5e;
		border-radius: 10px;

		.profile__orders {
			width: 100%;

			.profile__order {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				gap: 20px;
				margin-bottom: 20px;
				padding: 20px;
				border: 1px solid #5e5e5e;
				border-radius: 10px;
				background-color: #2b2b2b;

				.profile__order-info {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					margin-bottom: 20px;

					.profile__order-number {
						font-size: 18px;
						font-weight: 600;
					}

					.profile__order-date {
						font-size: 14px;
						color: #777;
					}
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

ProfileContainer.propTypes = {
	className: PropsTypes.string,
}
