import PropTypes from 'prop-types'

import { Table } from '../../../../../../../../components'
import { CategoriesRow } from '../categories-row/CategoriesRow'

import styled from 'styled-components'

const CategoriesTableContainer = ({ items }) => {
	const titlesAddButton = 'новую категорию'

	const headers = ['ID', 'Наименование', 'Подкатегории', 'Действия']

	return (
		<Table
			titlesAddButton={titlesAddButton}
			headers={headers}
			data={items}
			renderRow={(item, index) => (
				<CategoriesRow key={item.id} item={item} index={index} />
			)}
		/>
	)
}

export const CategoriesTable = styled(CategoriesTableContainer)``

CategoriesTableContainer.propTypes = {
	items: PropTypes.array.isRequired,
}
