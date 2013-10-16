
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
var create = require('create')
var listen = require('listen')

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

    app.get('/logout', function(req, res){
        req.logout()
        res.redirect('/')
    });

    app.get('/create', ensureAuthenticated, create.index)

    app.post('/create/save', ensureAuthenticated, create.save)

    app.get('/listen/:id([0-9a-f]{5,40})', ensureAuthenticated, listen.index)

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login')
    }
}
