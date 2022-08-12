const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
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

// Passport configuration
require('./config/passport')(passport)

// HandleBars
app.engine('.hbs', exphbs.engine({defaultLayout: 'index', extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} and app listening on port http://localhost:${port}`)
})