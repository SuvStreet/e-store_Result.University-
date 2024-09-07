import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useParams } from 'react-router-dom'

import { Error, Loader, Pagination } from '../../components'
import { getProductsList, searchItems } from '../../redux/actions'
import { CardProduct, Filter } from './components'
import { selectProductsList } from '../../redux/selectors'

import styled from 'styled-components'

const ProductsListContainer = ({ className }) => {
	const { subcategoryId } = useParams()
	const dispatch = useDispatch()
	const { products, isLoading, error, minPrice, maxPrice, brands } =
		useSelector(selectProductsList)
	const queryParams = new URLSearchParams(location.search)
	const searchQuery = queryParams.get('search')
	const isSearch = !!useMatch('/search')

	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(null)

	useEffect(() => {
		if (isSearch) {
			dispatch(searchItems({ search: searchQuery, page })).then((lastPage) =>
				setLastPage(lastPage),
			)
		} else {
			dispatch(getProductsList({ subCatId: subcategoryId, page })).then((lastPage) =>
				setLastPage(lastPage),
			)
		}
	}, [searchQuery, subcategoryId, page, dispatch, isSearch])

	if (error) {
		return <Error titleError={error} spin />
	}

	if (products.length === 0) {
		return <Error titleError='Товары не найдены' spin />
	}

	return (
		<div className={className}>
			{/* {!isSearch && <Filter minPrice={minPrice} maxPrice={maxPrice} brands={brands} />} */}
			<div className='row'>
				{isLoading ? (
					<Loader fontSize='150px' />
				) : (
					products.map((product) => <CardProduct product={product} key={product.id} />)
				)}
				{lastPage > 1 && <Pagination setPage={setPage} lastPage={lastPage} page={page} />}
			</div>
		</div>
	)
}

export const ProductsList = styled(ProductsListContainer)`
	width: 100%;
	display: flex;
	gap: 20px;

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		width: 100%;
	}
`

ProductsListContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
