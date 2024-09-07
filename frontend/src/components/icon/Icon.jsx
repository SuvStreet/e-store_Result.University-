import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled from 'styled-components'

const IconContainer = ({ className, iconCode, ...props }) => {
	return <FontAwesomeIcon className={className} icon={iconCode} {...props} />
}

export const Icon = styled(IconContainer)`
	display: flex;
	align-items: center;
	font-size: ${({ fontSize }) => fontSize || '32px'};
	margin: ${({ margin }) => margin || '0'};
	color: ${({ disabled }) => disabled && '#5e5e5e'};

	&:hover {
		cursor: ${({ cursor }) => cursor || 'pointer'};
	}
`

IconContainer.propTypes = {
	className: PropTypes.string.isRequired,
	iconCode: PropTypes.object.isRequired,
}
