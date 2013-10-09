
/*!
 * Module dependencies.
 */

var mongoose = require('mongoose')
var FacebookStrategy = require('passport-facebook').Strategy
var User = mongoose.model('User')

/**
 * Expose
 */

module.exports = function (passport, config) {

    // serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }, function (err, user) {
            done(err, user)
        })
    })

    // use Facebook Strategy
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientId,
        clientSecret: config.facebook.secret,
        callbackURL: config.facebook.callbackUrl
    },

    function(accessToken, refreshToken, profile, done) {

        var data = profile._json

        User.findOne({
            email: data.email
        },

        function(err, user) {

            if(user) return done(null, user)

            if(err) return done(null, profile)

            if(err == null) {
                var newUser = new User({
                    name: data.name,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    gender: data.gender,
                    location: data.location.name,
                    email: profile._json.email
                })

                newUser.save(function(err) {
                    if (err) throw err;
                })

                return done(null, newUser)
            }
        })
    }))
}