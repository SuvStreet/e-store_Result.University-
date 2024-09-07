import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import styled from 'styled-components'

const SidebarContainer = ({ className }) => {
	return (
		<div className={className}>
			<ul>
				{/* <li>
					<NavLink to='/admin/main'>Главная</NavLink>
				</li> */}
				<li>
					<NavLink to='/admin/categories'>Категории</NavLink>
				</li>
				<li>
					<NavLink to='/admin/sub-categories'>Подкатегории</NavLink>
				</li>
				<li>
					<NavLink to='/admin/products'>Товары</NavLink>
				</li>
				<li>
					<NavLink to='/admin/orders'>Заказы</NavLink>
				</li>
				<li>
					<NavLink to='/admin/users'>Пользователи</NavLink>
				</li>
			</ul>
		</div>
	)
}

export const Sidebar = styled(SidebarContainer)`
	background-color: #1c1c1c;
	border-radius: 10px;
	padding: 15px;

	.active {
		color: #007bff;
	}

	a {
		border-left: 3px solid;
		padding-left: 10px;
		justify-content: flex-start;

		&.active {
			border-left: 3px solid #007bff;
		}
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		padding: 5px 0;
		transition: all 0.3s;
	}

	li:hover {
		color: #858585;
	}
`

SidebarContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
