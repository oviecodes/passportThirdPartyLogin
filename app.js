

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const userRoutes = require('./routes/user')
const githubAuth = require('./config/passportGithub')
const facebookAuth = require('./config/passportFacebook')
const twitterAuth = require('./config/passportTwitter')
const User = require('./models/user')

const port = 3000

const app = express()

const authStrategies = [githubAuth, facebookAuth, twitterAuth]

authStrategies.forEach((el) => el(passport))
//mongodb connection logic
mongoose.connect(`mongodb://localhost:27017/thirdPartyauthwithSession`, 
    {  
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`connected to mongodb`)
    })
    .catch(e => {
        console.log(`something went wrong`)
    })

//express middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//session logic
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id)
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user)
    });
});


app.use('/users', userRoutes)

app.get(`/`, (req, res) => {
    res.send('welcome to the homepage')
})

app.listen(port, () => {
    console.log(`app is running on ${port}`)
})
