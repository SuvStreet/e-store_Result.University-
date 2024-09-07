import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import styled from 'styled-components'
import { formatPrice } from '../../../../utils'
import { H2, Input } from '../../../../components'

const FilterContainer = ({ className, minPrice, maxPrice, brands }) => {
	const [minValue, setMinValue] = useState(minPrice)
	const [maxValue, setMaxValue] = useState(maxPrice)

	useEffect(() => {
		setMinValue(minPrice)
		setMaxValue(maxPrice)
	}, [minPrice, maxPrice])

	const handleMinChange = (e) => {
		if (e.target.value >= minPrice) {
			const value = Math.min(Number(e.target.value), maxValue - 1)
			setMinValue(value)
		}
	}

	const handleMaxChange = (e) => {
		console.log('object :>> ', e.target.value)
		if (e.target.value <= maxPrice) {
			const value = Math.max(Number(e.target.value), minValue + 1)
			setMaxValue(value)
		}
	}

	return (
		<div className={className}>
			<div className='filter-container'>
				<H2>Фильтры</H2>

				<div className='brand'>
					<span className='title'>По бренду</span>
					<div className='checkbox-container'>
						{brands.map((brand) => (
							<div className='checkbox' key={brand}>
								<input id={brand} type='checkbox' />
								<label htmlFor={brand}>{brand}</label>
							</div>
						))}
						<div className='checkbox'>
							<input id='id1' type='checkbox' />
							<label htmlFor='id1'>Apple</label>
						</div>
					</div>
				</div>

				<div className='range-slider'>
					<span className='title'>Цена</span>
					<div className='range-values'>
						<div className='values'>
							<Input value={formatPrice(minValue)} onChange={handleMinChange} /> -
							<Input value={formatPrice(maxValue)} onChange={handleMaxChange} />
						</div>
					</div>
					<input
						type='range'
						min={minPrice}
						max={maxPrice}
						value={minValue}
						onChange={handleMinChange}
						className='thumb thumb-left'
					/>
					<input
						type='range'
						min={minPrice}
						max={maxPrice}
						value={maxValue}
						onChange={handleMaxChange}
						className='thumb thumb-right'
					/>
					<div className='slider'>
						<div className='track'></div>
						<div
							className='range'
							style={{
								left: `${((minValue - minPrice) / (maxPrice - minPrice)) * 100}%`,
								right: `${100 - ((maxValue - minPrice) / (maxPrice - minPrice)) * 100}%`,
							}}
						></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export const Filter = styled(FilterContainer)`
	display: flex;
	align-items: flex-start;

	.filter-container {
		display: flex;
		position: sticky;
		top: 150px;
		flex-direction: column;
		gap: 10px;
		border: 1px solid #5e5e5e;
		border-radius: 10px;
		padding: 20px 10px;
	}

	h2 {
		margin-bottom: 0;
	}

	.label {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.title {
		text-align: start;
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.brand {
		display: flex;
		flex-direction: column;
		max-height: 200px;
		overflow-y: auto;

		.checkbox-container {
			display: flex;
			flex-direction: column;
			gap: 5px;
		}

		.checkbox {
			display: flex;
			align-items: center;
			gap: 5px;
			cursor: pointer;
			font-size: 18px;

			input {
				width: 20px;
				height: 20px;
				cursor: inherit;
			}

			label {
				text-align: start;
				width: 100%;
				user-select: none;
				cursor: inherit;
			}
		}
	}

	.range-slider {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 300px;
		position: relative;
	}

	.range-values {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-bottom: 20px;

		input {
			margin: 0;
		}

		.values {
			display: flex;
			align-items: center;
			gap: 5px;
		}
	}

	input[type='range'] {
		position: absolute;
		bottom: -7px;
		width: 100%;
		pointer-events: none;
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		background: transparent;
		z-index: 100;
	}

	input[type='range']::-webkit-slider-thumb {
		pointer-events: all;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 1px solid black;
		background: #5e5e5e;
		cursor: pointer;
		-webkit-appearance: none;
	}

	input[type='range']:focus {
		outline: none;
	}

	.slider {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		height: 1px;
		background-color: #5e5e5e;
		border-radius: 5px;
		z-index: 0;
	}

	.track {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #5e5e5e;
		z-index: 1;
	}

	.range {
		position: absolute;
		height: 100%;
		background-color: #007bff;
		z-index: 2;
		border-radius: 5px;
	}
`

FilterContainer.propTypes = {
	className: PropTypes.string,
	minPrice: PropTypes.number.isRequired,
	maxPrice: PropTypes.number.isRequired,
	brands: PropTypes.array.isRequired,
}
