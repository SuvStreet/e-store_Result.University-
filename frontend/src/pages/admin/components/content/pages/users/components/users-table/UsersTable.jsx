import PropTypes from 'prop-types'

import { Table } from '../../../../../../../../components'
import { UsersRow } from '../users-row/UsersRow'

import styled from 'styled-components'

const UsersTableContainer = ({ items }) => {
	const headers = [
		'ID',
		'Фото',
		'Email',
		'Login',
		'Права пользователя',
		'Создание аккаунта',
		'Действия',
	]

	return (
		<Table
			headers={headers}
			data={items}
			renderRow={(item, index) => <UsersRow key={item.id} item={item} index={index} />}
		/>
	)
}

export const UsersTable = styled(UsersTableContainer)``

UsersTableContainer.propTypes = {
	items: PropTypes.array.isRequired,
}
