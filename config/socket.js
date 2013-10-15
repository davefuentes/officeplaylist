/**
 * (CC) 2013 Kernellstudios. Some rights reserved.
 * User: David Morabito
 * Date: 10/14/13
 */

module.exports = function(io) {

    var usernames = [];

    io.sockets.on('connection', function (socket) {

        // when the client emits 'adduser', this listens and executes
        socket.on('adduser', function(username, room_id, room_name){

            // store the username in the socket session for this client
            socket.username = username;
            // store the room name in the socket session for this client
            socket.room = room_id;
            // store room name
            socket.room_name = room_name;
            // send client to room
            socket.join(room_id);
            // echo to client they've connected
            socket.emit('updatechat', 'SERVER', 'you have connected to: ' + socket.room_name);
            io.sockets.emit('updateusers', io.sockets.clients(socket.room));
            // echo to room that a person has connected to their room
            socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has connected to this room');
        });

        // when the client emits 'sendchat', this listens and executes
        socket.on('sendchat', function (data) {
            // we tell the client to execute 'updatechat' with 2 parameters
            io.sockets.in(socket.room).emit('updatechat', socket.username, data);
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', function(){
            // remove the username from global usernames list
            delete usernames[socket.username.id];
            // update list of users in chat, client-side
            io.sockets.emit('updateusers', usernames);
            // echo globally that this client has left
            socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has disconnected');
            socket.leave(socket.room);
        });
    });
}