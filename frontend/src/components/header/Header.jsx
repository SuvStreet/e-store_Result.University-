import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

import { Logo, Search, ControlPanel, CategoriesProducts } from './components'
import { initializeApp } from '../../redux/actions'
import { selectAppIsAuth, selectUserLogin } from '../../redux/selectors'

import styled from 'styled-components'

const HeaderContainer = ({ className }) => {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectAppIsAuth)
	const login = useSelector(selectUserLogin)
	const pathnameAdmin = useMatch('/admin/*')
	const pathnameCart = useMatch('/cart')

	useEffect(() => {
		if (isAuth && !login) {
			dispatch(initializeApp(pathnameCart))
		}
	}, [dispatch, isAuth, login, pathnameCart])

	return (
		<>
			<div className={className}>
				<div className={`header-info ${pathnameAdmin ? 'header-info--admin' : ''}`}>
					<Logo />
					<Search />
					<ControlPanel userLogin={login} />
				</div>
				{!pathnameAdmin && (
					<div className='header-menu'>
						<CategoriesProducts />
					</div>
				)}
			</div>
		</>
	)
}

export const Header = styled(HeaderContainer)`
	width: 100%;
	padding-top: 20px;
	box-shadow: 0 5px 5px -5px #5e5e5e;
	position: sticky;
	top: 0;
	z-index: 10;
	background-color: #242424;

	& .header-info {
		display: flex;
		justify-content: space-between;
		align-items: center;

		&--admin {
			margin-bottom: 20px;
		}
	}

	& .header-menu {
		width: 100%;
	}
`

HeaderContainer.propTypes = {
	className: PropTypes.string,
}
