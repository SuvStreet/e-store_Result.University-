export const REGEX = {
	URL:
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
	LOGIN: /^[A-Za-zА-Яа-я0-9]+$/,
	PASSWORD: /^[A-Za-zА-Яа-я0-9#%]+$/,
	EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
}
