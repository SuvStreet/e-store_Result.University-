import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { Button } from '../button/Button'
import { selectModal } from '../../redux/selectors'

import styled from 'styled-components'

const ModalContainer = ({ className }) => {
	const { isOpen, textModal, onConfirm, onCancel } = useSelector(selectModal)

	if (!isOpen) return null

	return (
		<div className={`${className} ${isOpen && 'modal-open'}`}>
			<div className='overlay'>
				<div className='modal-box'>
					<h3>{textModal}</h3>
					<div className='buttons'>
						<Button width='100px' onClick={onConfirm}>
							Да
						</Button>
						<Button width='100px' onClick={onCancel}>
							Отмена
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 20;

	& .overlay {
		background-color: rgba(0, 0, 0, 0.9);
		width: 100dvw;
		height: 100dvh;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	& .modal-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20px;
		max-width: 400px;
		background-color: #242424;
		border: 1px solid #5e5e5e;
		border-radius: 10px;
	}

	& .modal-box h3 {
		margin-bottom: 20px;
	}

	& .buttons {
		display: flex;
		justify-content: space-around;
		width: 100%;
	}
`

ModalContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
