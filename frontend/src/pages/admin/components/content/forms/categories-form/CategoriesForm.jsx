import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { Button, FormError, Input, Loader } from '../../../../../../components'
import { ACTION_TYPE, addCategory, editCategory } from '../../../../../../redux/actions'
import { selectCategoriesList } from '../../../../../../redux/selectors'

import styled from 'styled-components'

const CategoriesFormSchema = yup.object().shape({
	name: yup
		.string()
		.required('Название категории не может быть пустым')
		.min('4', 'Названия категории не менее - 4 символов')
		.max('50', 'Название категории не более - 50 символов'),
})

const CategoriesFormContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
		},
		resolver: yupResolver(CategoriesFormSchema),
	})
	const { categories, isLoading, error: serverError } = useSelector(selectCategoriesList)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id: categoryId } = useParams()
	const isEdit = !!useMatch('/admin/categories/edit/:id')

	useEffect(() => {
		if (isEdit) {
			setValue('name', categories.find(({ id }) => id === categoryId)?.name)
		}
	}, [isEdit, categoryId, categories, setValue])

	const onSubmit = ({ name }) => {
		dispatch(isEdit ? editCategory(categoryId, { name }) : addCategory({ name })).then(
			(message) => {
				if (message) {
					navigate('/admin/categories')
				}
			},
		)
	}

	const resetServerError = () => {
		if (serverError) {
			dispatch({ type: ACTION_TYPE.RESET_CATEGORIES_ERROR })
		}
	}

	const formError = errors.name?.message

	const errorMessage = serverError || formError

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<div className='input__container'>
				<label>Название категории:</label>
				<Input
					type='text'
					placeholder='Название категории'
					{...register('name', {
						onChange: () => {
							resetServerError()
						},
					})}
				/>
			</div>
			{errorMessage && <FormError>{errorMessage}</FormError>}
			<Button solid='green' disabled={isLoading || !!errorMessage}>
				{isLoading ? <Loader /> : 'Сохранить категорию'}
			</Button>
		</form>
	)
}

export const CategoriesForm = styled(CategoriesFormContainer)`
	display: flex;
	flex-direction: column;
	width: 100%;

	label {
		font-weight: 700;
		margin-right: 10px;
		width: 150px;
	}

	.input__container {
		display: flex;
		margin-bottom: 20px;
	}
`

CategoriesFormContainer.propTypes = {
	className: PropTypes.string,
}
