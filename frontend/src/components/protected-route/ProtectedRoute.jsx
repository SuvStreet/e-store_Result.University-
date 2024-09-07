import PropType from 'prop-types'
import { Navigate } from 'react-router-dom'

import localStorageService from '../../service/localStorageService'

export const ProtectedRoute = ({ children, redirectTo }) => {
	const session = localStorageService.getAuth()
	return session ? children : <Navigate to={redirectTo} />
}

ProtectedRoute.propTypes = {
	children: PropType.node.isRequired,
	redirectTo: PropType.string.isRequired,
}
