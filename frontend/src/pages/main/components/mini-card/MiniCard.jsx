import PropTypes from 'prop-types'

import { formatPrice } from '../../../../utils'

import styled from 'styled-components'

const MiniCardContainer = ({ className, product, link, onClick }) => {
	const { imgUrl, name, price } = product || {}

	return (
		<div className={className} onClick={onClick}>
			<div className='container'>
				{!link && (
					<div className='card'>
						<div className='imgContainer'>
							<img src={imgUrl} alt={name} />
						</div>
						<div className='info'>
							<h3>{name}</h3>
							<p>{formatPrice(price)} ₽</p>
						</div>
					</div>
				)}

				{link && <span className='link'>Смотреть все</span>}
			</div>
		</div>
	)
}

export const MiniCard = styled(MiniCardContainer)`
	width: 200px;
	height: 250px;
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		border: 1px solid #5e5e5e;
		border-radius: 10px;
		padding: 10px;
		cursor: pointer;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: #5e5e5e;
		}

		.card {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 10px;

			.imgContainer {
				width: 120px;
				height: 120px;
				overflow: hidden;
				border-radius: 10px;

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}

			.info {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 5px;

				h3 {
					font-size: 18px;
					font-weight: 500;
					text-align: center;
					margin: 0;
				}

				p {
					font-size: 16px;
					font-weight: 600;
					margin: 0;
				}
			}
		}

		.link {
			font-size: 16px;
			font-weight: 500;
			color: #007bff;
			cursor: pointer;
			text-align: center;
			margin-top: auto;
		}
	}
`

MiniCardContainer.propTypes = {
	className: PropTypes.string.isRequired,
	product: PropTypes.shape({
		imgUrl: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
	}),
	link: PropTypes.bool,
	onClick: PropTypes.func,
}
