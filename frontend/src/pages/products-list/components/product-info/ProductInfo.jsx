import PropTypes from 'prop-types'

import styled from 'styled-components'

const ProductInfoContainer = ({ className, name, description }) => {
	return (
		<div className={className}>
			<div className='title-product'>
				<h3>{name}</h3>
			</div>

			<div className='description-product'>
				<p>{description}</p>
			</div>
		</div>
	)
}

export const ProductInfo = styled(ProductInfoContainer)`
	display: flex;
	align-items: flex-start;
	flex-direction: column;

	.title-product {
		font-weight: 500;
		font-size: 20px;
	}

	.description-product {
		font-weight: 400;
		font-size: 14px;
		color: #5e5e5e;
	}
`

ProductInfoContainer.propTypes = {
	className: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
}
