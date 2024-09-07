import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Button, Icon } from '../../../../../../../../components'
import { removeSubCategory } from '../../../../../../../../redux/actions'

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const SubCategoriesRowContainer = ({ item, index }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { name, category, imgUrl, products } = item

	const handelEditClick = () => {
		navigate(`edit/${item.id}`)
	}

	const handelRemoveClick = () => {
		dispatch(removeSubCategory(item.id, name))
	}

	return (
		<>
			<div className='cell'>{index + 1}</div>
			<div className='cell'>
				<img src={imgUrl} alt={name} width='50' height='50' />
			</div>
			<div className='cell prompt' title={name}>
				{name}
			</div>
			<div className='cell'>{category.name}</div>
			<div className='cell'>{products.length}</div>
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

export const SubCategoriesRow = styled(SubCategoriesRowContainer)``

SubCategoriesRowContainer.propTypes = {
	item: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
}
