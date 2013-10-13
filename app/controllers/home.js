
/*!
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Playlist = mongoose.model('Playlist')

exports.index = function(req, res) {

    var profile = null
    if(req.user) profile = req.user

    var playlistMap = []

    Playlist.find({}, function(err, playlists) {

        playlists.forEach(function(playlist) {
            playlistMap.push({
                name: playlist.name,
                url: playlist.url
            })
        })
    })

    res.render('home', {
        title: 'Welcome!',
        profile: profile,
        playlists: playlistMap
    })
}
