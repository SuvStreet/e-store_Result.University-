export const transformDate = (date) => {
	// Получаем время с сервера (например, '2023-07-27T12:00:00Z')
	const serverTime = new Date(date)

	// Получаем часовой пояс пользователя
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

	// Форматируем время в часовом поясе пользователя
	const userTime = new Intl.DateTimeFormat('ru-RU', {
		timeZone: userTimeZone,
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	}).format(serverTime)

	return userTime
}
