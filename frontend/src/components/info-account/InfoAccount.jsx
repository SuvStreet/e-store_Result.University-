import PropTypes from 'prop-types'

import { InfoCard } from './info-card/InfoCard'

import { faBox, faPercent, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const textCardAuthorization = [
	{
		textCard: 'Заказывайте быстрее',
		iconCode: faTruckFast,
	},
	{
		textCard: 'Отслеживайте статус заказа',
		iconCode: faBox,
	},
	{
		textCard: 'Воспользуйтесь скидками и акциями',
		iconCode: faPercent,
	},
]

const InfoAccountContainer = ({ className }) => {
	return (
		<div className={className}>
			<h3>Почему стоит иметь учётную запись в нашем магазине?</h3>
			<div className='info-list'>
				{textCardAuthorization.map(({ textCard, iconCode }, index) => (
					<InfoCard key={index} textCard={textCard} iconCode={iconCode} />
				))}
			</div>
		</div>
	)
}

export const InfoAccount = styled(InfoAccountContainer)`
	margin: ${({ margin }) => margin || '0'};

	& h3 {
		border-bottom: 1px solid #5e5e5e;
		margin-bottom: 20px;
		padding-bottom: 10px;
		font-weight: 500;
	}
`

InfoAccountContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
