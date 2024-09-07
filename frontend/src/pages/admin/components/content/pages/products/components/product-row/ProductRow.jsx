import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { removeProduct } from '../../../../../../../../redux/actions'
import { Button, Icon } from '../../../../../../../../components'

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const ProductRowContainer = ({ item, index }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { images, name, subCategoryId, quantity, price } = item

	const handelEditClick = () => {
		navigate(`edit/${item.id}`)
	}

	const handelRemoveClick = () => {
		dispatch(removeProduct(item.id, name))
	}

	return (
		<>
			<div className='cell'>{index + 1}</div>
			<div className='cell'>
				<img src={images[0]} alt={name} width='50' height='50' />
			</div>
			<div className='cell prompt' title={name}>
				{name}
			</div>
			<div className='cell prompt' title={subCategoryId.name}>
				{subCategoryId.name}
			</div>
			<div className='cell'>
				<div>{quantity}</div>
			</div>
			<div className='cell'>
				<div>{price}</div>
			</div>
			<div className='cell buttons'>
				<Button className='edit' onClick={() => handelEditClick()}>
					<Icon iconCode={faEdit} fontSize='1rem' />
				</Button>
				<Button className='delete' solid='red' onClick={() => handelRemoveClick()}>
					<Icon iconCode={faTrash} fontSize='1rem' />
				</Button>
			</div>
		</>
	)
}

export const ProductRow = styled(ProductRowContainer)``

ProductRowContainer.propTypes = {
	item: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
}
