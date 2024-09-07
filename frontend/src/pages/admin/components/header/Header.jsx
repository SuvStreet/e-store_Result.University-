import PropTypes from 'prop-types'

import styled from 'styled-components'

const HeaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<h1>Панель управления</h1>
		</div>
	)
}

export const Header = styled(HeaderContainer)`
	/* background-color: #444; */
	padding: 10px;
`

HeaderContainer.propTypes = {
	className: PropTypes.string,
}
