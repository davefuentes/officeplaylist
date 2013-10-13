/**
 * (CC) 2013 Kernellstudios. Some rights reserved.
 * User: David Morabito
 * Date: 10/12/13
 */

var loggedUser = null;
var mongoose = require('mongoose')
var Playlist = mongoose.model('Playlist')
var crypto = require('cryptojs').Crypto

exports.index = function(req, res) {

    if(req.user) loggedUser = req.user

    res.render('create', {
        title: 'Create New Playlist',
        profile: loggedUser
    })
}

exports.save = function(req, res) {

    /**
     * TODO: Redirect user to login page, if loggedUser variable is empty or null.
     * Also, validate the form here. Create validators, and alert messages on the views.
     */

    var author = loggedUser.facebook_id
    var playlistName = req.body.playlistName
    var playlistUrl = crypto.SHA1(author + playlistName)
    var error = null

    console.log("Author: " + author)
    console.log("Playlist Name: " + playlistName)
    console.log("Playlist URL: " + playlistUrl)

    // look for an existent playlist
    Playlist.findOne({
            url: playlistUrl
    },

    function(err, playlist) {

        if(playlist) {
            playlistName = playlist.name
            playlistUrl = playlist.url
        }

        if(err) error = err

        // if nothing found, create a new one
        if(err == null && !playlist) {

            var newPlaylist = new Playlist({
                author: author,
                name: playlistName,
                url: playlistUrl
            })

            newPlaylist.save(function(err) {
                if (err) throw err;
            })

            res.redirect('/listen/' + playlistUrl);
        }
    })

    res.render('create', {
        title: 'Welcome!',
        profile: loggedUser,
        playlistName: playlistName,
        playlistUrl: playlistUrl,
        message: "Playlist already exists",
        error: error
    })
}
