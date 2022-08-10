const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
dotenv.config()

// Calling connection for DB
connectDB()

const app = express()
const port = process.env.PORT

// Logging the errors
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// HandleBars
app.engine('.hbs', exphbs.engine({defaultLayout: 'index', extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

// Routes
app.use('/', require('./routes/index'))

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} and app listening on port http://localhost:${port}`)
})