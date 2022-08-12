const router = require('express').Router()
const passport = require('passport')

// ROUTE 1 :- To google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard')
})

module.exports = router