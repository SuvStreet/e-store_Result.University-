import PropTypes from 'prop-types'

import { Button } from '../button/Button'

import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const TableContainer = ({ className, headers, data, renderRow, titlesAddButton }) => {
	const navigate = useNavigate()

	const handelAddClick = () => {
		navigate('add')
	}

	return (
		<div className={className}>
			<div className='header'>
				{headers.map((header, index) => (
					<div
						key={index}
						className={`cell prompt ${header === 'Действия' ? 'actions' : ''}`}
						title={header}
					>
						{header}
					</div>
				))}
			</div>
			<div className='body'>
				{titlesAddButton && (
					<Button className='add' solid='green' onClick={() => handelAddClick()}>
						<span>Добавить {titlesAddButton}</span>
					</Button>
				)}
				{data.map((item, index) => (
					<div key={index} className='row'>
						{renderRow(item, index)}
					</div>
				))}
			</div>
		</div>
	)
}

TableContainer.propTypes = {
	className: PropTypes.string.isRequired,
	headers: PropTypes.arrayOf(PropTypes.string).isRequired,
	data: PropTypes.array.isRequired,
	renderRow: PropTypes.func.isRequired,
	titlesAddButton: PropTypes.string,
}

export const Table = styled(TableContainer)`
	display: flex;
	flex-direction: column;
	padding: 10px 0;
	gap: 10px;

	.header {
		box-shadow: 0 5px 5px -5px #5e5e5e;
	}

	.header,
	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
		gap: 10px;
	}

	.cell {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		&:first-of-type {
			flex: 0.2;
		}
	}

	.cell-2{
		flex: 2;
	}

	.prompt {
		cursor: pointer;
	}

	.row {
		border-bottom: 1px solid #5e5e5e;
	}

	.buttons,
	.actions {
		display: flex;
		gap: 10px;
		justify-content: center;
		max-width: 100px;
	}
`
