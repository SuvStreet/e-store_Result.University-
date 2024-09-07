import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { Icon } from '../../../icon/Icon'

import { faMicrochip } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const LogoContainer = ({ className }) => {
	const navigate = useNavigate()

	const handleClickLogo = () => {
		navigate('/')
	}

	return (
		<div className={className} onClick={() => handleClickLogo()}>
			<Icon iconCode={faMicrochip} fontSize='40px' />
			<p className='logo__text'>
				Лучший <br /> магазин <br /> техники
			</p>
		</div>
	)
}

export const Logo = styled(LogoContainer)`
	display: flex;
	align-items: center;
	cursor: pointer;
	height: 100%;

	.logo__text {
		margin-left: 15px;
		font-weight: 500;
		font-size: 13px;
		text-transform: uppercase;
		text-align: end;
		line-height: 1.2;
	}
`

LogoContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
