import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'

import {
	appReducer,
	mainReducer,
	userReducer,
	productsListReducer,
	singleProductReducer,
	categoriesListReducer,
	subCategoriesListReducer,
	cartReducer,
	orderReducer,
} from './reducers'

const reducer = combineReducers({
	app: appReducer,
	main: mainReducer,
	user: userReducer,
	productsList: productsListReducer,
	singleProduct: singleProductReducer,
	categoriesList: categoriesListReducer,
	subCategoriesList: subCategoriesListReducer,
	cart: cartReducer,
	order: orderReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
