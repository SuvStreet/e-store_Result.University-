require('dotenv').config()

const path = require('path')
const express = require('express')
const chalk = require('chalk')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const routes = require('./routes')

const port = 3005
const app = express()

app.use(express.static(path.resolve('..', 'frontend', 'dist')))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	cors({
		origin: 'http://localhost:3000',
		// origin: (origin, callback) => {
		// 	callback(null, true) // разрешить все CORS-запросы
		// },
		credentials: true,
	}),
)

app.use('/api', routes)

app.get('/*', (req, res) => {
	res.sendFile(path.resolve('..', 'frontend', 'dist', 'index.html'))
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(chalk.green(`Server started on port ${port}`))
	})
})
