import { GenericListContainer } from '../../../../../../components'
import { getCategoriesList } from '../../../../../../redux/actions'
import { selectCategoriesList } from '../../../../../../redux/selectors'
import { CategoriesTable } from './components'

export const Categories = () => {
	return (
		<GenericListContainer
			fetchData={getCategoriesList}
			selectData={selectCategoriesList}
			TableComponent={CategoriesTable}
			addPath='/admin/categories/add'
			editPath='/admin/categories/edit/:id'
			dataKey='categories'
		/>
	)
}
