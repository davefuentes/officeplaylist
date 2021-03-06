
/**
 * Module dependencies
 */

var express = require('express')
var passport = require('passport')
var env = process.env.NODE_ENV || 'development'
var config = require('./config/config')[env]
var mongoose = require('mongoose')
var fs = require('fs')
var http = require('http')

require('express-namespace')

mongoose.connect(config.db)

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file)
})

// Bootstrap passport config
require('./config/passport')(passport, config)

var app = express()

// Bootstrap application settings
require('./config/express')(app, config, passport)

// Bootstrap routes
require('./config/routes')(app, passport)

// Start the app by listening on <port>
var port = process.env.PORT || 3000
var io = require('socket.io').listen(app.listen(port));

// Socket logic
require('./config/socket.js')(io)

// Expose app
module.exports = app
