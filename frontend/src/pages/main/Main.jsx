import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getMain } from '../../redux/actions'
import { selectMain } from '../../redux/selectors'
import { Error, Loader } from '../../components'
import { MiniCard } from './components'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

const MainContainer = ({ className }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { isLoading, error, main } = useSelector(selectMain)

	useEffect(() => {
		dispatch(getMain())
	}, [])

	if (isLoading) {
		return <Loader fontSize='150px' />
	}

	if (error) {
		return <Error titleError={error} />
	}

	return (
		<main className={className}>
			{main.map(({ subcategory, products }) => (
				<div key={subcategory.id} className='wrapper'>
					<div className='container'>
						<h3>{subcategory.name}</h3>
						<div className='card'>
							{products.map((product) => (
								<MiniCard
									key={product.id}
									product={product}
									onClick={() => navigate(`/products/${product.id}`)}
								/>
							))}
							<MiniCard
								link={true}
								onClick={() => navigate(`/sub-category/${subcategory.id}`)}
							/>
						</div>
					</div>
				</div>
			))}
		</main>
	)
}

export const Main = styled(MainContainer)`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;

	.wrapper {
		display: flex;
		gap: 20px;

		.container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 20px;

			h3 {
				align-self: flex-start;
				font-weight: 700;
				font-size: 30px;
			}

			.card {
				display: flex;
				flex-wrap: wrap;
				gap: 20px;
			}
		}
	}
`

MainContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
