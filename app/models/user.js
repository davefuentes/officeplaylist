
/*!
 * Module dependencies
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema

/**
 * User schema
 */

var UserSchema = new Schema({
    facebook_id: {
        default: '',
        index: {
            unique: true
        },
        required: true,
        type: String
    },

    name: {
        default: '',
        required: true,
        type: String
    },

    firstName: {
        default: '',
        required: false,
        type: String
    },

    lastName: {
        default: '',
        required: false,
        type: String
    },

    gender: {
        default: '',
        required: false,
        type: String
    },

    location: {
        default: '',
        required: false,
        type: String
    },

    email: {
        default: '',
        required: false,
        type: String
    }
})

/**
 * Methods
 */

UserSchema.method({

})

/**
 * Statics
 */

UserSchema.static({

})

/**
 * Register
 */

mongoose.model('User', UserSchema)