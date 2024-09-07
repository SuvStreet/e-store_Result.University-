import { URL } from '../constants/url'

export const request = (url, method = 'GET', data = null) => {
	return fetch(`${URL.API}${url}`, {
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		credentials: 'include',
		method,
		body: data && JSON.stringify(data),
	}).then((response) => response.json())
}
