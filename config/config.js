
/*!
 * Module dependencies.
 */

var path = require('path')
var rootPath = path.resolve(__dirname + '../..')

/**
 * Expose config
 */

module.exports = {

    development: {
        root: rootPath,
        db: 'mongodb://localhost/officeplaylist',
        facebook: {
            clientId: '502707963154265',
            secret: process.env.DEV_FCBK_SECRET,
            callbackUrl: 'http://localhost:3000/login/facebook/callback'
        }
    },

    staging: {
        root: rootPath,
        db: process.env.STG_MONGODB,
        facebook: {
            clientId: '1422610261287338',
            secret: process.env.STG_FCBK_SECRET,
            callbackUrl: 'http://officeplaylist.jit.su/login/facebook/callback'
        }
    },

    production: {
        root: rootPath,
        db: process.env.MONGOHQ_URL
    }
}
