import PropTypes from 'prop-types'

import styled from 'styled-components'

const FeatureContainer = ({ className, features, noTitle }) => {
	return (
		<div className={className}>
			{!noTitle && <h4 className='feature__title'>Характеристики:</h4>}

			<div className='feature__data'>
				{features.map(({ id, key, value }) => (
					<div className='data' key={id}>
						<p className='data__name'>{key}</p>
						<p className='data__text'>{value}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export const Feature = styled(FeatureContainer)`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	border-top: 1px solid #5e5e5e;
	border-bottom: 1px solid #5e5e5e;
	padding: 0 20px;

	.feature__title {
		margin: 10px 0;
	}

	.feature__data {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin: 10px 0;

		.data {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			gap: 15px;
			text-align: start;
		}

		.data__name {
			flex: 1;
			font-weight: 700;
			color: #5e5e5e;
			text-decoration: dotted underline;
		}

		.data__text {
			flex: 1;
		}
	}
`

FeatureContainer.propTypes = {
	className: PropTypes.string,
	features: PropTypes.array.isRequired,
	noTitle: PropTypes.bool,
}
