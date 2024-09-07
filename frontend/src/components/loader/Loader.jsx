import PropTypes from 'prop-types'

import { Icon } from '../icon/Icon'

import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const LoaderContainer = ({ className, fontSize }) => {
	return (
		<div className={className}>
			<Icon
				iconCode={faEllipsis}
				fontSize={fontSize || 'auto'}
				beatFade
				cursor='inherit'
			/>
		</div>
	)
}

export const Loader = styled(LoaderContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
`

LoaderContainer.propTypes = {
	className: PropTypes.string.isRequired,
	fontSize: PropTypes.string,
}
