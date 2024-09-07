import PropTypes from 'prop-types'

import styled from 'styled-components'

const H2Container = ({ className, children }) => {
	return <h2 className={className}>{children}</h2>
}

export const H2 = styled(H2Container)`
	margin-bottom: 20px;
`

H2Container.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
}
