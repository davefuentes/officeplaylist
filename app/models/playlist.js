/**
 * (CC) 2013 Kernellstudios. Some rights reserved.
 * User: David Morabito
 * Date: 10/12/13
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PlaylistSchema = new Schema({
    author: {
        default: '',
        required: true,
        type: String
    },

    name: {
        default: '',
        required: true,
        type: String
    },

    created: {
        default: '',
        required: false,
        type: Date
    },

    url: {
        default: '',
        index: {
            unique: true
        },
        required: true,
        type: String
    },

    private: {
        default: false,
        required: false,
        type: Boolean
    },

    password: {
        default: '',
        required: false,
        type: String
    }
})

PlaylistSchema.pre('save', function (next) {
    if (!this.created) this.created = new Date;
    next();
})

mongoose.model('Playlist', PlaylistSchema)