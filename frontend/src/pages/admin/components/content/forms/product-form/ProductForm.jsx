import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import {
	ACTION_TYPE,
	addProduct,
	getSubCategoriesList,
	editProduct,
	getProduct,
} from '../../../../../../redux/actions'
import {
	selectProduct,
	selectProductsList,
	selectSubCategoriesList,
} from '../../../../../../redux/selectors'

import {
	Button,
	FormError,
	Input,
	Loader,
	Select,
	Textarea,
} from '../../../../../../components' // Импорт вашего компонента для отображения ошибок

import styled from 'styled-components'

const schema = yup.object().shape({
	name: yup.string().required('Название товара обязательно'),
	description: yup.string().required('Описание обязательно'),
	subcategory_id: yup.string().required('Подкатегория обязательна'),
	images: yup
		.array()
		.of(
			yup
				.string()
				.url('Некорректный URL изображения')
				.required('Изображение обязательно'),
		),
	brand: yup.string().required('Бренд обязателен'),
	features: yup.array().of(
		yup.object().shape({
			key: yup.string().required('Ключ обязателен'),
			value: yup.string().required('Значение обязательно'),
		}),
	),
	price: yup
		.number()
		.required('Цена обязательна')
		.positive('Цена должна быть положительной'),
	discount: yup.number().min(0, 'Скидка не может быть отрицательной'),
	quantity: yup.number().min(0, 'Количество не может быть отрицательным'),
})

const ProductFormContainer = ({ className }) => {
	const dispatch = useDispatch()
	const { subCategories, isLoading: isLoadingSub } = useSelector(selectSubCategoriesList)
	const { isLoading: isLoadingProduct } = useSelector(selectProductsList)
	const product = useSelector(selectProduct)
	const navigate = useNavigate()
	const { id: idProduct } = useParams()
	const isEdit = !!useMatch('/admin/products/edit/:id')

	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			description: '',
			subcategory_id: '',
			images: [''],
			brand: '',
			features: [{ key: '', value: '' }],
			discount: 0,
			price: 0,
			quantity: 0,
		},
	})

	const { fields: imageFields, append: appendImage } = useFieldArray({
		control,
		name: 'images',
	})
	const { fields: featureFields, append: appendFeature } = useFieldArray({
		control,
		name: 'features',
	})

	useEffect(() => {
		dispatch(getSubCategoriesList({ id: null }))

		if (product.id === null && isEdit) {
			dispatch(getProduct(idProduct))
		}

		if (isEdit && product.id) {
			if (product) {
				setValue('name', product.name)
				setValue('description', product.description)
				setValue('subcategory_id', product.subCategoryId.id)
				setValue('images', product.images)
				setValue('brand', product.brand)
				setValue('features', product.features)
				setValue('discount', product.discount)
				setValue('price', product.price)
				setValue('quantity', product.quantity)
			}
		} else if (!isEdit && subCategories.length) {
			setValue('subcategory_id', subCategories[0].id)
		}

		if (imageFields.length === 0 && !isEdit) {
			appendImage('')
		}
	}, [product.id, subCategories.length])

	const onSubmit = (data) => {
		dispatch(isEdit ? editProduct(idProduct, data) : addProduct(data)).then((message) => {
			if (message) {
				navigate('/admin/products')
			}
		})
	}

	const resetError = () => {
		if (product.error) {
			dispatch({ type: ACTION_TYPE.RESET_PRODUCT_ERROR })
		}
	}

	if (!subCategories.length || isLoadingSub) {
		return <Loader fontSize='150px' />
	}

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<div className='form__group'>
				<label>Название товара:</label>
				<div className='form__input'>
					<Input
						type='text'
						{...register('name', { onChange: () => resetError() })}
						placeholder='Название товара'
					/>
					{errors.name && <FormError>{errors.name.message}</FormError>}
				</div>
			</div>
			<div className='form__group'>
				<label>Описание:</label>
				<div className='form__input'>
					<Textarea
						type='text'
						{...register('description', { onChange: () => resetError() })}
						placeholder='Описание'
					/>
					{errors.description && <FormError>{errors.description.message}</FormError>}
				</div>
			</div>

			<div className='form__group'>
				<label>ID Подкатегории:</label>

				<div className='form__input'>
					<Select
						name='subcategory_id'
						list={subCategories}
						{...register('subcategory_id')}
					/>
					{errors.subcategory_id && (
						<FormError>{errors.subcategory_id.message}</FormError>
					)}
				</div>
			</div>

			<div className='form__group'>
				<label>Изображения (URLs):</label>
				<div className='form__input'>
					{imageFields.map((img, idx) => (
						<div key={img.id} className='form__group'>
							<div className='form__input'>
								<Input
									type='text'
									{...register(`images.${idx}`, {
										onChange: () => resetError(),
									})}
									placeholder='URL изображения'
								/>
								{errors.images?.[idx] && (
									<FormError>{errors.images[idx].message}</FormError>
								)}
							</div>
						</div>
					))}
					<Button type='button' onClick={() => appendImage('')} solid='green'>
						Добавить изображение
					</Button>
				</div>
			</div>

			<div className='form__group'>
				<label>Бренд:</label>
				<div className='form__input'>
					<Input
						type='text'
						{...register('brand', { onChange: () => resetError() })}
						placeholder='Бренд'
					/>
					{errors.brand && <FormError>{errors.brand.message}</FormError>}
				</div>
			</div>

			<div className='form__group'>
				<label>Общие характеристики:</label>
				<div className='form__features'>
					{featureFields.map((feature, idx) => (
						<div className='form__feature' key={feature.id}>
							<div className='form__input'>
								<Input
									type='text'
									{...register(`features.${idx}.key`, {
										onChange: () => resetError(),
									})}
									placeholder='Ключ'
								/>
								{errors.features?.[idx]?.key && (
									<FormError>{errors.features[idx].key.message}</FormError>
								)}
							</div>
							<div className='form__input'>
								<Input
									type='text'
									{...register(`features.${idx}.value`, {
										onChange: () => resetError(),
									})}
									placeholder='Значение'
								/>
								{errors.features?.[idx]?.value && (
									<FormError>{errors.features[idx].value.message}</FormError>
								)}
							</div>
						</div>
					))}

					<Button
						type='button'
						onClick={() => appendFeature({ key: '', value: '' })}
						solid='green'
					>
						Добавить характеристику
					</Button>
				</div>
			</div>

			<div className='form__group'>
				<label>Цена:</label>
				<div className='form__input'>
					<Input
						type='number'
						{...register(`price`, {
							onChange: () => resetError(),
						})}
					/>
					{errors.price && <FormError>{errors.price.message}</FormError>}
				</div>
			</div>

			<div className='form__group'>
				<label>Скидка:</label>
				<div className='form__input'>
					<Input
						type='number'
						{...register(`discount`, {
							onChange: () => resetError(),
						})}
					/>
					{errors.discount && <FormError>{errors.discount.message}</FormError>}
				</div>
			</div>

			<div className='form__group'>
				<label>Количество:</label>
				<div className='form__input'>
					<Input
						type='number'
						{...register(`quantity`, {
							onChange: () => resetError(),
						})}
					/>
					{errors.quantity && <FormError>{errors.quantity.message}</FormError>}
				</div>
			</div>

			{product.error && <FormError>{product.error}</FormError>}
			<Button type='submit' disabled={product.isLoading || product.error}>
				{isLoadingProduct ? <Loader /> : 'Сохранить продукт'}
			</Button>
		</form>
	)
}

ProductFormContainer.propTypes = {
	className: PropTypes.string,
}

export const ProductForm = styled(ProductFormContainer)`
	.form__group {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}

	input {
		margin: 0;
	}

	label {
		font-weight: 700;
		margin-right: 10px;
		width: 150px;
	}

	.form__input {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		& div {
			width: 100%;
		}
	}

	.form__features {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;

		.form__feature {
			display: flex;
			gap: 20px;
		}
	}

	.form__variants {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;

		.form__variant {
			display: flex;
			flex-direction: column;
			border: 1px solid #5e5e5e;
			border-radius: 10px;
			padding: 20px;

			.variant {
				display: flex;
				align-items: center;
				gap: 10px;
				margin-bottom: 10px;
			}

			.form__features-variant {
				display: flex;
				flex-direction: column;

				.form__feature-variant {
					width: 100%;
					display: flex;
					gap: 20px;
				}

				label {
					width: 100%;
				}
			}
		}
	}
`
