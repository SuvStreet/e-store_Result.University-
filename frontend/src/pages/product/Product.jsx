import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Error, Icon, Loader } from '../../components'
import { getProduct } from '../../redux/actions'
import { selectProduct, selectUser } from '../../redux/selectors'
import { Card } from './components'
import { ROLE } from '../../constants'

import { faEdit } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const ProductContainer = ({ className }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { productsId } = useParams()
	const product = useSelector(selectProduct)
	const userRole = useSelector(selectUser).roleId

	useEffect(() => {
		dispatch(getProduct(productsId))
	}, [dispatch, productsId])

	if (!product.id || product.isLoading) {
		return <Loader fontSize='150px' />
	}

	if (product.error) {
		return <Error titleError={product.error} noAccess />
	}

	return (
		<div className={className}>
			{userRole === ROLE.ADMIN ? (
				<div className='favorite'>
					<Button
						width='40px'
						onClick={() => navigate(`/admin/products/edit/${productsId}`)}
					>
						<Icon iconCode={faEdit} fontSize='20px'></Icon>
					</Button>
				</div>
			) : null}

			<Card product={product} />
		</div>
	)
}

export const Product = styled(ProductContainer)`
	position: relative;
	width: 100%;

	.favorite {
		position: absolute;
		top: 0px;
		right: 0px;
		display: flex;
		justify-content: flex-end;
	}
`

ProductContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
