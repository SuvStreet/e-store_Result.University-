import { Routes, Route, Navigate, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppIsAuth, selectCategoriesList } from './redux/selectors'

import { Header, Footer, ProtectedRoute, Error, Modal } from './components'
import {
	Authorization,
	ProductsList,
	Registration,
	Admin,
	Main,
	Product,
	Profile,
	SubCategory,
	Cart,
} from './pages'
import { EditForm } from './pages/profile/components'

import styled from 'styled-components'
import { useEffect } from 'react'
import { getCategoriesList } from './redux/actions'

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 1400px;
	width: 100%;
	min-height: 100dvh;
	margin: 0 auto;
	text-align: center;
	padding: 0 20px;
`

const Page = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	flex: 1 0 auto;
	padding: 20px 0;
`

export const Store = () => {
	const dispatch = useDispatch()
	const pathnameAdmin = useMatch('/admin/*')
	const isAuth = useSelector(selectAppIsAuth)
	const { categories } = useSelector(selectCategoriesList)

	useEffect(() => {
		if (!categories.length && !pathnameAdmin) {
			dispatch(getCategoriesList())
		}
	}, [categories, dispatch, pathnameAdmin])

	const isAuthorized = ({ children, redirectTo }) => {
		return isAuth ? <Navigate to={redirectTo} /> : children
	}

	return (
		<AppContainer>
			<Header />
			<Page>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route
						path='/authorize'
						element={isAuthorized({
							children: <Authorization />,
							redirectTo: '/',
						})}
					/>
					<Route
						path='/register'
						element={isAuthorized({
							children: <Registration />,
							redirectTo: '/',
						})}
					/>
					<Route
						path='/profile/:id'
						element={
							<ProtectedRoute redirectTo='/authorize'>
								<Profile />
							</ProtectedRoute>
						}
					>
						<Route path='edit' element={<EditForm />} />
					</Route>
					<Route path='/categories/:categoryId' element={<SubCategory />} />
					<Route path='/sub-category/:subcategoryId' element={<ProductsList />} />
					<Route path='/products/:productsId' element={<Product />} />
					<Route path='/admin/*' element={<Admin />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/search' element={<ProductsList />} />
					<Route
						path='*'
						element={<Error titleError='Страница не найдена' spin></Error>}
					/>
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppContainer>
	)
}
