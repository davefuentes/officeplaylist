/**
 * (CC) 2013 Kernellstudios. Some rights reserved.
 * User: David Morabito
 * Date: 10/13/13
 */

var loggedUser = null;
var mongoose = require('mongoose')
var Playlist = mongoose.model('Playlist')

exports.index = function(req, res) {

    var profile = null
    if(req.user) profile = req.user
    var playlistUrl = req.params.id

    // check if the id exists
    Playlist.findOne({
        url: playlistUrl
    }, function(err, playlist) {
        if(!playlist) res.status(404).send('Not found')

        res.render('listen', {
            room: {
                name: playlist.name,
                id: playlistUrl
            },
            profile: profile,
            scripts_listen: true
        })
    })
}