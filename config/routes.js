
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var passportOptions = {
    failureFlash: 'Invalid email or password.',
    failureRedirect: '/login'
}

// controllers
var home = require('home')
var login = require('login')

/**
 * Expose
 */

module.exports = function (app, passport) {

    app.get('/', home.index)

    app.get('/login', login.index)

    app.get('/login/facebook', passport.authenticate('facebook'))

    app.get('/login/facebook/callback', passport.authenticate('facebook', passportOptions), function(req, res) {
        res.redirect('/')
    })
}
