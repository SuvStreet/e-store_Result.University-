import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import styled from 'styled-components'

const SelectContainer = forwardRef(
	({ className, list, name, value, onChange, ...props }, ref) => {
		return (
			<select
				name={name}
				className={className}
				value={value}
				onChange={onChange}
				ref={ref}
				{...props}
			>
				{list.map(({ id, name }) => (
					<option key={id} value={id}>
						{name}
					</option>
				))}
			</select>
		)
	},
)

SelectContainer.displayName = 'SelectContainer'

export const Select = styled(SelectContainer)`
	width: 100%;
	height: 40px;
	font-size: 1.2rem;
	background-color: transparent;
	border-radius: 5px;
	border: 1px solid #5e5e5e;
	color: #fff;
	cursor: pointer;
	padding: 0 10px;

	& option {
		color: #fff;
		background-color: #242424;
	}
`

SelectContainer.propTypes = {
	className: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func.isRequired,
}
