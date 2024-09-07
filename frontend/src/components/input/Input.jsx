import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import styled from 'styled-components'

const InputContainer = forwardRef(({ className, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />
})

InputContainer.displayName = 'InputContainer'

export const Input = styled(InputContainer)`
	width: ${({ width }) => width || '100%'};
	height: 40px;
	padding: 0 10px;
	border: 1px solid #5e5e5e;
	border-radius: 10px;
	margin: 0 0 10px 0;
	background-color: transparent;
	color: white;
	font-size: 20px;
`

InputContainer.propTypes = {
	className: PropTypes.string.isRequired,
	width: PropTypes.string,
}
