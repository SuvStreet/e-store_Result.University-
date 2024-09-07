import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'

import { Icon } from '../../../icon/Icon'
import { Input } from '../../../input/Input'
import { debounce } from '../../../../utils/debounce'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const SearchContainer = ({ className }) => {
	const [value, setValue] = useState('')
	const navigate = useNavigate()
	const isSearch = !!useMatch('/search')
	const queryParams = new URLSearchParams(location.search)
	const searchQuery = queryParams.get('search')

	const handleSearch = useCallback(
		debounce((value) => {
			if (!isSearch || value) {
				navigate(`/search?search=${value}`)
			}
		}, 2000),
		[isSearch, navigate],
	)

	useEffect(() => {
		if (searchQuery) {
			setValue(searchQuery)
		}
	}, [searchQuery])

	const onChange = ({ target: { value } }) => {
		setValue(value)
		if (value.trim()) {
			handleSearch(value)
		}
	}

	return (
		<div className={className}>
			<Input placeholder='Что ищешь?' value={value} onChange={onChange} />
			<Icon iconCode={faMagnifyingGlass} fontSize='25px' />
		</div>
	)
}

export const Search = styled(SearchContainer)`
	display: flex;
	align-items: center;
	width: 100%;
	margin: 0 20px;
	position: relative;

	& input {
		margin: 0;
		padding-right: 45px;

		&::placeholder {
			color: #5e5e5e;
		}

		&:focus + svg {
			color: white;
		}
	}

	svg {
		position: absolute;
		right: 10px;
		color: #5e5e5e;

		&:hover {
			cursor: text;
		}
	}
`

SearchContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
