

const express = require('express')
const router = express.Router()
const passport = require('passport')
const { isauth, notauth } = require('../middleware/index')

router.route('/signup')
    .all(notauth)
    .get()
    .post()

router.route('/login')
    .all(notauth)
    .get()
    .post()

router.get('/auth/github', notauth,
    passport.authenticate('github', { scope: [ 'user:email' ] })
)

router.get('/auth/github/callback', notauth,
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/users/dashboard');
    })

router.get('/auth/facebook', notauth,
    passport.authenticate('facebook', { scope: ['email'] })
)

router.get('/auth/facebook/callback', notauth,
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/users/dashboard');
    })

router.get('/auth/twitter', notauth,
    passport.authenticate('twitter', { scope: ['email'] }))
  
router.get('/auth/twitter/callback', notauth,
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/users/dashboard');
    })

router.route('/dashboard')
    .all(isauth)
    .get(
        async(req, res) => {
            res.send(`welcome to your dashboard ${req.user.username}`)
        }
    )
    .post()

module.exports = router