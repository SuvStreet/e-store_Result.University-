import PropType from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Icon } from '../../../icon/Icon'
import { selectCart, selectUserId } from '../../../../redux/selectors'

import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const ControlPanelContainer = ({ className, userLogin }) => {
	const navigate = useNavigate()
	const userId = useSelector(selectUserId)
	const cart = useSelector(selectCart)

	const handleClickUser = () => {
		navigate(!userLogin ? '/authorize' : `/profile/${userId}`)
	}

	return (
		<div className={className}>
			<div className='header-info__item' onClick={() => handleClickUser()}>
				<p className='user__text'>Привет, {userLogin || 'авторизоваться'}</p>
				<Icon iconCode={faUser} />
			</div>
			<div className='header-info__item' onClick={() => navigate('/catalog')}>
				<Icon iconCode={faHeart} />
			</div>
			<div className='header-info__item' onClick={() => navigate('/cart')}>
				<Icon iconCode={faCartShopping} />
				{cart.items.length > 0 && <div className='volume'>
					{cart.items.length}
				</div>}
			</div>
		</div>
	)
}

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;

	.user__text {
		width: 100%;
		margin-right: 10px;
		font-weight: 500;
		font-size: 14px;
		text-align: end;
	}

	.header-info__item {
		display: flex;
		align-items: center;
		padding: 0 5px;
		cursor: pointer;
		position: relative;
	}

	.volume{
		position: absolute;
		top: -5px;
		right: 0;
		display: flex;
		font-weight: bold;
		justify-content: center;
		align-items: center;
		padding: 0 5px;
		min-width: 20px;
		height: 20px;
		font-size: 15px;
		color: white;
		background-color: red;
		border-radius: 50%;
		margin-left: 10px;
	}
`

ControlPanelContainer.propTypes = {
	className: PropType.string.isRequired,
	userLogin: PropType.string,
}
