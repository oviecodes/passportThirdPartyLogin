

require('dotenv').config()
const GitHubStrategy = require('passport-github2').Strategy
const { findOrCreateUser } = require('./socialLogic')
const User = require('../models/user')

module.exports = async(passport) => {
    passport.use(
        new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },
        async function(accessToken, refreshToken, profile, done) {
            
            const { username, emails } = profile
            const [emailfield, ..._] = emails
            const email = emailfield.value
            
            //find or create a new user
            findOrCreateUser(User, email, username, done)

        }
    ));
}