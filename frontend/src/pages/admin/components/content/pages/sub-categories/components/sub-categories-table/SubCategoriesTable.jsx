import PropTypes from 'prop-types'

import { Table } from '../../../../../../../../components'
import { SubCategoriesRow } from '../sub-categories-row/SubCategoriesRow'

import styled from 'styled-components'

const SubCategoriesTableContainer = ({ items }) => {
	const titlesAddButton = 'новую подкатегорию'

	const headers = [
		'ID',
		'Фото',
		'Наименование',
		'Категория',
		'Количество товаров',
		'Действия',
	]

	return (
		<Table
			titlesAddButton={titlesAddButton}
			headers={headers}
			data={items}
			renderRow={(item, index) => (
				<SubCategoriesRow key={item.id} item={item} index={index} />
			)}
		/>
	)
}

export const SubCategoriesTable = styled(SubCategoriesTableContainer)``

SubCategoriesTableContainer.propTypes = {
	items: PropTypes.array.isRequired,
}
