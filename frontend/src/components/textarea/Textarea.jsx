import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import styled from 'styled-components'

const TextareaContainer = forwardRef(({ className, ...props }, ref) => {
	return <textarea className={className} {...props} ref={ref} />
})

TextareaContainer.displayName = 'TextareaContainer'

export const Textarea = styled(TextareaContainer)`
	width: ${({ width }) => width || '100%'};
	height: 150px;
	padding: 10px;
	border: 1px solid #5e5e5e;
	border-radius: 10px;
	background-color: transparent;
	color: white;
	font-size: 20px;
	resize: none;
`

TextareaContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
