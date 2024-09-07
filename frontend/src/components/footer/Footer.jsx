import PropTypes from 'prop-types'

import styled from 'styled-components'

const FooterContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className='footer'>
				<p>Лучший магазин техники</p>
				<a href='https://result.school/' target='_blank' className='link'>
					Result.University
				</a>
			</div>
		</div>
	)
}

export const Footer = styled(FooterContainer)`
	height: 120px;
	width: 100%;
	box-shadow: 0 -5px 5px -5px #5e5e5e;

	.footer {
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	a {
		transition: 0.3s ease;

		&:hover {
			color: #ff9c00;
		}
	}
`

FooterContainer.propTypes = {
	className: PropTypes.string,
}
