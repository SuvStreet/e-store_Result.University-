import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PropType from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button, FormError, H2, InfoAccount, Input, Loader } from '../../components'
import {
	selectAppError,
	selectAppIsAuth,
	selectAppIsLoading,
} from '../../redux/selectors'
import { ACTION_TYPE, authorization } from '../../redux/actions'
import { REGEX } from '../../constants'

import styled from 'styled-components'

const authFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Электронная почта не может быть пустой')
		.matches(REGEX.EMAIL, 'Некорректная электронная почта'),
	password: yup
		.string()
		.required('Пароль не может быть пустым')
		.matches(
			REGEX.PASSWORD,
			'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %',
		)
		.min('4', 'Неверный пороль. Минимальная длина пороля - 4 символа')
		.max('30', 'Неверный пороль. Максимальная длина пороля - 30 символов'),
})

const AuthorizationContainer = ({ className }) => {
	const navigate = useNavigate()
	const [serverError, setServerError] = useState(null)
	const dispatch = useDispatch()
	const error = useSelector(selectAppError)
	const isLoading = useSelector(selectAppIsLoading)
	const isAuth = useSelector(selectAppIsAuth)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	})

	useEffect(() => {
		if (error) {
			dispatch({ type: ACTION_TYPE.RESET_ERROR })
			setServerError(error)
			return
		}

		if (isAuth && !error) {
			navigate(-1)
		}
	}, [error, isAuth, navigate, dispatch])

	const onSubmit = ({ email, password }) => {
		dispatch(authorization({ email, password }))
	}

	const formError = errors?.email?.message || errors?.password?.message

	const errorMessage = formError || serverError

	return (
		<div className={className}>
			<div className='container-auth'>
				<div className='form-auth'>
					<H2>Авторизоваться</H2>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							type='text'
							{...register('email', { onChange: () => setServerError(null) })}
							placeholder='Email'
						/>
						<Input
							type='password'
							{...register('password', { onChange: () => setServerError(null) })}
							placeholder='Пароль'
						/>
						<Button type='submit' disabled={!!formError || isLoading} solid='#5e5e5e'>
							{isLoading ? <Loader /> : 'Авторизоваться'}
						</Button>
						{errorMessage && <FormError>{errorMessage}</FormError>}
					</form>
				</div>
			</div>
			<div className='container-reg'>
				<div className='not-account'>
					<H2>У вас нет аккаунта?</H2>
					<Button height='40px'>
						<Link to='/register'>Создать аккаунт</Link>
					</Button>
				</div>

				<InfoAccount />
			</div>
		</div>
	)
}

export const Authorization = styled(AuthorizationContainer)`
	display: flex;

	h2 {
		text-align: start;
	}

	.container-auth {
		display: flex;
		justify-content: center;
		align-items: start;
	}

	.form-auth {
		padding: 20px;
		margin: 20px;
		border: 1px solid #5e5e5e;
		border-radius: 10px;
	}

	.container-reg {
		display: flex;
		flex-direction: column;
		margin: 20px;
	}

	.not-account {
		padding-top: 20px;
		margin-bottom: 20px;
	}

	@media (max-width: 768px) {
		display: block;

		.form-auth {
			margin: 0;
		}
	}
`

AuthorizationContainer.propTypes = {
	className: PropType.string,
}
