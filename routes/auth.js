const router = require('express').Router()
const passport = require('passport')

// ROUTE 1 :- To google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard')
})

router.get('/logout', function (req, res) {
    console.log(req)
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router