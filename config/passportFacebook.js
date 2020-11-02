


require('dotenv').config()
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const generator = require('generate-password');


module.exports = function(passport) {
    passport.use(new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'displayName', 'email']
        },
        async function(accessToken, refreshToken, profile, done) {
            console.log(profile._json)
            const { name, email } = profile._json
            const user = await User.findOne({ email })
            if(user) {
                return done(null, user)
            }
            
            const newUser = await User.create({
                name,
                email,
                password: generator.generate({
                    length: 10,
                    numbers: true
                }), 
            })
            return done(null, newUser)
        }
    ))
}
