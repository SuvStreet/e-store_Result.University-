import PropTypes from 'prop-types'

import { Pagination, Table } from '../../../../../../../../components'
import { ProductRow } from '../product-row/ProductRow'

import styled from 'styled-components'

const ProductTableContainer = ({ items, page, lastPage, setPage }) => {
	const titlesAddButton = 'новый товар'

	const headers = [
		'ID',
		'Фото',
		'Наименование',
		'Категория',
		'Количество',
		'Цена',
		'Действия',
	]

	return (
		<>
			<Table
				titlesAddButton={titlesAddButton}
				headers={headers}
				data={items}
				renderRow={(item, index) => (
					<ProductRow key={item.id} item={item} index={index} />
				)}
			/>
			{lastPage > 1 && <Pagination page={page} setPage={setPage} lastPage={lastPage} />}
		</>
	)
}

export const ProductTable = styled(ProductTableContainer)``

ProductTableContainer.propTypes = {
	items: PropTypes.array.isRequired,
	lastPage: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
}
