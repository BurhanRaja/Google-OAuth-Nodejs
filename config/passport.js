const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
require('dotenv').config()
const User = require('../models/User')

module.exports = handleGoogleReq = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'auth/google/callback',
        scope: ['profile']
    }, 
        async (acessToken, refreshToken, profile, done) => {
            console.log(profile)
        }
    ))

    passport.serialize((user, done) => {
        done(null, user.id)
    })
    passport.deserialize((id, done) => {
        User.findOne(id, (err, user) => {
            done(err, user)
        })
    })
}

