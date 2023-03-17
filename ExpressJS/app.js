const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const main = require('./db')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	main()
	return res.send('Get ok')
})

app.use('/api', require('./routes/api.route'))

app.listen(8080, () => { console.log('Server started at port 8080') })
