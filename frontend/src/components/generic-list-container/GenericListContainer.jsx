import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useMatch } from 'react-router-dom'

import { Loader, Error } from '../../components'

export const GenericListContainer = ({
	fetchData,
	selectData,
	TableComponent,
	addPath,
	editPath,
	dataKey,
}) => {
	const dispatch = useDispatch()
	const { [dataKey]: list, isLoading, error } = useSelector(selectData)
	const isAdd = !!useMatch(addPath || '/')
	const isEdit = !!useMatch(editPath || '/')
	const [lastPage, setLastPage] = useState(0)
	const [page, setPage] = useState(1)

	useEffect(() => {
		dispatch(fetchData({ page })).then((lastPage) => setLastPage(lastPage))
	}, [dispatch, fetchData, page])

	if (isLoading && !isAdd && !isEdit) {
		return <Loader fontSize='150px' />
	}

	if (error && !isAdd && !isEdit) {
		return <Error titleError={error} noAccess />
	}

	return (
		<>
			{isAdd || isEdit ? (
				<Outlet />
			) : (
				<TableComponent items={list} setPage={setPage} lastPage={lastPage} page={page} />
			)}
		</>
	)
}

GenericListContainer.propTypes = {
	fetchData: PropTypes.func.isRequired,
	selectData: PropTypes.func.isRequired,
	TableComponent: PropTypes.elementType.isRequired,
	addPath: PropTypes.string,
	editPath: PropTypes.string,
	dataKey: PropTypes.string.isRequired,
}
