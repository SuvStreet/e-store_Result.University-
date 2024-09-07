import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { Button, FormError, Input, Loader, Select } from '../../../../../../components'
import {
	ACTION_TYPE,
	addSubCategory,
	editSubCategory,
	getCategoriesList,
} from '../../../../../../redux/actions'
import {
	selectCategoriesList,
	selectSubCategoriesList,
} from '../../../../../../redux/selectors'

import styled from 'styled-components'

const SubCategoriesFormSchema = yup.object().shape({
	name: yup
		.string()
		.required('Название категории не может быть пустым')
		.min('4', 'Названия категории не менее - 4 символов')
		.max('50', 'Название категории не более - 50 символов'),
	category_id: yup.string(),
	img_url: yup.string().url('Некорректный URL изображения'),
})

const SubCategoriesFormContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			category_id: '',
			img_url: '',
		},
		resolver: yupResolver(SubCategoriesFormSchema),
	})
	const {
		subCategories,
		isLoading: subCategoriesIsLoading,
		error: subCategoriesError,
	} = useSelector(selectSubCategoriesList)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id: subCategoryId } = useParams()
	const { categories, isLoading: categoriesIsLoading } = useSelector(selectCategoriesList)
	const isEdit = !!useMatch('/admin/sub-categories/edit/:id')

	useEffect(() => {
		if (!categories.length && !categoriesIsLoading) {
			dispatch(getCategoriesList())
		}

		if (isEdit && subCategoryId) {
			const subCategory = subCategories.find((item) => item.id === subCategoryId)
			if (subCategory) {
				setValue('name', subCategory.name)
				setValue('category_id', subCategory.category.id)
				setValue('img_url', subCategory.imgUrl)
			}
		} else {
			setValue('category_id', categories[0]?.id)
		}
	}, [
		isEdit,
		subCategoryId,
		subCategories,
		setValue,
		categories,
		dispatch,
		categoriesIsLoading,
	])

	const onSubmit = ({ name, category_id, img_url }) => {
		dispatch(
			isEdit
				? editSubCategory(subCategoryId, { name, category_id, img_url })
				: addSubCategory({ name, category_id, img_url }),
		).then((message) => {
			if (message) {
				navigate('/admin/sub-categories')
			}
		})
	}

	const resetServerError = () => {
		if (subCategoriesError) {
			dispatch({ type: ACTION_TYPE.RESET_SUBCATEGORY_ERROR })
		}
	}

	const formError =
		errors.name?.message || errors.category_id?.message || errors.img_url?.message

	const errorMessage = subCategoriesError || formError

	if (subCategoriesIsLoading || categoriesIsLoading) {
		return <Loader fontSize='150px' />
	}

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<div className='form__group'>
				<label>Название подкатегории:</label>
				<Input
					type='text'
					placeholder='Название подкатегории'
					{...register('name', {
						onChange: () => {
							resetServerError()
						},
					})}
				/>
			</div>
			<div className='form__group'>
				<label>Выбрать категорию:</label>
				<Select
					type='text'
					list={categories}
					placeholder='Название подкатегории'
					{...register('category_id', {
						onChange: () => {
							resetServerError()
						},
					})}
				/>
			</div>
			<div className='form__group'>
				<label>Изображения (URLs):</label>
				<Input
					type='text'
					placeholder='URL изображения'
					{...register('img_url', {
						onChange: () => {
							resetServerError()
						},
					})}
				/>
			</div>
			{errorMessage && <FormError>{errorMessage}</FormError>}
			<Button solid='green' disabled={subCategoriesIsLoading || !!errorMessage}>
				{subCategoriesIsLoading ? <Loader /> : 'Сохранить подкатегорию'}
			</Button>
		</form>
	)
}

export const SubCategoriesForm = styled(SubCategoriesFormContainer)`
	display: flex;
	flex-direction: column;
	width: 100%;

	label {
		font-weight: 700;
		margin-right: 10px;
		width: 150px;
	}

	.form__group {
		display: flex;
		margin-bottom: 20px;
	}
`

SubCategoriesFormContainer.propTypes = {
	className: PropTypes.string,
}
