const router = require('express').Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

// ROUTE 1 :- To login
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout:'login'
    })
})

// ROUTE 2 :- To Dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard')
})

module.exports = router