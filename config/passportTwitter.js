

require('dotenv').config()
const TwitterStrategy = require('passport-twitter').Strategy
const { findOrCreateUser } = require('./socialLogic')
const User = require('../models/user')

module.exports = (passport) => {
    passport.use(new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: process.env.TWITTER_CALLBACK_URL,
            userProfileURL  : 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true'
        },
        async function(token, tokenSecret, profile, done) {
           
            const { username, emails } = profile
            const [emailfield, ..._] = emails
            const email = emailfield.value

            //find or create a new user
            findOrCreateUser(User, email, username, done)
           
        }
    ))
}