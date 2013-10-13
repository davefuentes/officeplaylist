/**
 * (CC) 2013 Kernellstudios. Some rights reserved.
 * User: David Morabito
 * Date: 10/13/13
 */

var loggedUser = null;
var mongoose = require('mongoose')
var Playlist = mongoose.model('Playlist')

exports.index = function(req, res) {

    // check if the id exists
    Playlist.findOne({
        url: req.params.id
    }, function(err, playlist) {
        if(!playlist) res.status(404).send('Not found')

        res.send(playlist.name)
    })
}