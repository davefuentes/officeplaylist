
/*!
 * Module dependencies
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema

/**
 * User schema
 */

var UserSchema = new Schema({
    name: {
        default: '',
        required: true,
        type: String
    },

    firstName: {
        default: '',
        required: true,
        type: String
    },

    lastName: {
        default: '',
        required: true,
        type: String
    },

    gender: {
        default: '',
        required: true,
        type: String
    },

    location: {
        default: '',
        required: true,
        type: String
    },

    email: {
        default: '',
        index: {
            unique: true
        },
        required: true,
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