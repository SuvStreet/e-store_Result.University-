import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Error, H2, Loader } from '../../components'
import { getSubCategoriesList } from '../../redux/actions'
import { selectSubCategoriesList } from '../../redux/selectors'

import styled from 'styled-components'

const SubCategoryContainer = ({ className }) => {
	const dispatch = useDispatch()
	const { categoryId } = useParams()
	const {
		subCategories,
		isLoading: subCategoriesIsLoading,
		error,
	} = useSelector(selectSubCategoriesList)
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(getSubCategoriesList({id: categoryId}))
	}, [dispatch, categoryId])

	const handleClickProducts = (subcategoryId) => {
		navigate(`/sub-category/${subcategoryId}`)
	}

	if (subCategoriesIsLoading) {
		return <Loader fontSize='150px' />
	}

	if (error) {
		return <Error titleError={error} noAccess />
	}

	return (
		<div className={className}>
			{subCategories.map(({ id, name, imgUrl }) => (
				<div className='wrapper' key={id}>
					<div className='card' onClick={() => handleClickProducts(id)}>
						<div className='card__img'>
							<img src={imgUrl} />
						</div>
						<div className='card__text'>
							<H2 className='product-title'>{name}</H2>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export const SubCategory = styled(SubCategoryContainer)`
	display: flex;
	gap: 10px;
	width: 100%;

	.wrapper {
	}

	.card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		line-height: 2rem;
		border: 1px solid #5e5e5e;
		border-radius: 10px;
		padding: 10px;
		cursor: pointer;
	}

	.card__img {
		max-width: 250px;
		height: 230px;
		overflow: hidden;

		img {
			max-width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 10px;
		}
	}

	.card__text {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h2 {
		margin: 0;
		margin-top: 10px;
		font-size: 1.2rem;
	}
`

SubCategoryContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
