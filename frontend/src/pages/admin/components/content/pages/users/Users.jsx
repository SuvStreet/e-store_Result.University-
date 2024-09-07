import { GenericListContainer } from '../../../../../../components'
import { getUsersList } from '../../../../../../redux/actions'
import { selectUsersList } from '../../../../../../redux/selectors'
import { UsersTable } from './components'

export const Users = () => {
	return (
		<GenericListContainer
			fetchData={getUsersList}
			selectData={selectUsersList}
			TableComponent={UsersTable}
			dataKey='users'
		/>
	)
}
