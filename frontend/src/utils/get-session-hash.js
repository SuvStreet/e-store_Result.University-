export const getSessionHash = () => {
	return localStorage.getItem('sessionHash') || null
}
