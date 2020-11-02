

const express = require('express')
const router = express.Router()
const passport = require('passport')

router.route('/signup')
    .get()
    .post()

router.route('/login')
    .get()
    .post()

router.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] })
);

router.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.route('/dashboard')
    .get()
    .post()

module.exports = router