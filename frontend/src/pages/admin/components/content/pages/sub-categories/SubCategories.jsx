import { GenericListContainer } from '../../../../../../components'
import { getSubCategoriesList } from '../../../../../../redux/actions'
import { selectSubCategoriesList } from '../../../../../../redux/selectors'
import { SubCategoriesTable } from './components'

export const SubCategories = () => {
	return (
		<GenericListContainer
			fetchData={getSubCategoriesList}
			selectData={selectSubCategoriesList}
			TableComponent={SubCategoriesTable}
			addPath='/admin/sub-categories/add'
			editPath='/admin/sub-categories/edit/:id'
			dataKey='subCategories'
		/>
	)
}
