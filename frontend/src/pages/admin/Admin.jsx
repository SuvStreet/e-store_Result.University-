import propTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { Sidebar, Header, Content } from './components'
import { selectAppIsLoading, selectUser } from '../../redux/selectors'
import { ROLE } from '../../constants'
import { Error, Loader } from '../../components'

import styled from 'styled-components'

const AdminContainer = ({ className }) => {
	const isLoadingApp = useSelector(selectAppIsLoading)
	const { roleId } = useSelector(selectUser)

	if (isLoadingApp) {
		return <Loader fontSize='150px' />
	}

	return (
		<>
			{roleId === ROLE.ADMIN ? (
				<div className={className}>
					<Sidebar />
					<div className='main-content'>
						<Header />
						<Content />
					</div>
				</div>
			) : (
				<Error titleError='У вас нет доступа к этой странице' noAccess />
			)}
		</>
	)
}

export const Admin = styled(AdminContainer)`
	flex: 1;
	display: flex;

	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
`

AdminContainer.propTypes = {
	className: propTypes.string.isRequired,
}
