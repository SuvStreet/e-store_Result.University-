import { GenericListContainer } from '../../../../../../components'
import { getProductsList } from '../../../../../../redux/actions'
import { selectProductsList } from '../../../../../../redux/selectors'
import { ProductTable } from './components'

export const Products = () => {
	return (
		<GenericListContainer
			fetchData={getProductsList}
			selectData={selectProductsList}
			TableComponent={ProductTable}
			addPath='/admin/products/add'
			editPath='/admin/products/edit/:id'
			dataKey='products'
		/>
	)
}
