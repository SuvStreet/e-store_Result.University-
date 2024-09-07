import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'
import { selectAppIsLoading, selectCategoriesList } from '../../../../redux/selectors'
import { Loader } from '../../../loader/Loader'

import styled from 'styled-components'

const CategoriesProductsContainer = ({ className }) => {
	const { categories } = useSelector(selectCategoriesList)
	const isLoading = useSelector(selectAppIsLoading)

	return (
		<div className={className}>
			<ul>
				{isLoading && !categories.length ? (
					<Loader />
				) : (
					categories.map(({ id, name }) => (
						<NavLink to={`/categories/${id}`} key={id}>
							<li>{name}</li>
						</NavLink>
					))
				)}
			</ul>
		</div>
	)
}

export const CategoriesProducts = styled(CategoriesProductsContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	padding: 20px 0;

	ul {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		padding: 0 10px;
		font-weight: 500;
		font-size: 14px;
	}

	a:not(:last-child) {
		border-right: 1px solid #5e5e5e;
	}

	a {
		transition: 0.3s ease;
	}

	a:hover,
	.active {
		color: #8e65ff;
	}
`

CategoriesProductsContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
