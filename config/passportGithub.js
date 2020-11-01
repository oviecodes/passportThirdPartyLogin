

require('dotenv').config()
const GitHubStrategy = require('passport-github2').Strategy
const User = require('../models/user')
const generator = require('generate-password');
 

module.exports = async(passport) => {
    passport.use(
        new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },
        async function(accessToken, refreshToken, profile, done) {
            const { displayName: name, emails } = profile
            const [emailValue, ..._] = emails
            const { value: email } = emailValue
            console.log(name, email, accessToken)
            const user = await User.findOne({ email })
            if(user) {
                return done(null, user)
            }

            const newUser = await User.create({ 
                email, 
                password: generator.generate({
                    length: 10,
                    numbers: true
                }), 
                name,
                login: github
            });
            return done(null, newUser)
        }
    ));
}