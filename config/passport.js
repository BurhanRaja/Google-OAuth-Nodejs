const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

module.exports = handleGoogleReq = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
    }, 
        async (acessToken, refreshToken, profile, done) => {
            const salt = await bcrypt.genSalt(10)
            password = await bcrypt.hash(profile.name.givenName, salt)

            const newUser = {
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                password: password,
                iamge: profile.photos[0].value
            }
            
            try {
                let user = await User.findOne({ googleId: profile.id })
                if (user) {
                    done(null, user)
                }
                else {
                    user = await User.create(newUser)
                    done(null, user)
                }
            } catch (error) {
                console.log(error)
            }
        }
    ))

    passport.serializeUser(function(user, done){
        done(null, user.id);
    })
    
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        })
    })
}

