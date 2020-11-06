


require('dotenv').config()
const FacebookStrategy = require('passport-facebook').Strategy
const { findOrCreateUser } = require('./socialLogic')
const User = require('../models/user')


module.exports = function(passport) {
    passport.use(new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'displayName', 'email']
        },
        async function(accessToken, refreshToken, profile, done) {

            const { name: username, email } = profile._json
            const user = await User.findOne({ email })

            //find or create a new user
            findOrCreateUser(User, email, username, done)
           
        }
    ))
}
