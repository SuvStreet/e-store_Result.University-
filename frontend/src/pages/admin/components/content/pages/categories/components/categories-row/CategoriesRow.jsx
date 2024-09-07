import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Button, Icon } from '../../../../../../../../components'
import { removeCategory } from '../../../../../../../../redux/actions'

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

export const CategoriesRow = ({ item, index }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { name, subcategories } = item

	const handelEditClick = () => {
		navigate(`edit/${item.id}`)
	}

	const handelRemoveClick = () => {
		dispatch(removeCategory(item.id, name))
	}

	return (
		<>
			<div className='cell'>{index + 1}</div>
			<div className='cell prompt' title={name}>
				{name}
			</div>
			{subcategories.length === 0 ? (
				<div className='cell'>Подкатегории не найдены</div>
			) : (
				<>
					<div className='cell'>
						{subcategories.map((subcategories) => (
							<div
								key={subcategories.id}
								className='cell prompt'
								title={subcategories.name}
							>
								{subcategories.name}
							</div>
						))}
					</div>
				</>
			)}

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

CategoriesRow.propTypes = {
	item: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
}
