const router = require('express').Router()

// ROUTE 1 :- To login
router.get('/', (req, res) => {
    res.render('login', {
        layout:'login'
    })
})

// ROUTE 2 :- To Dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

module.exports = router