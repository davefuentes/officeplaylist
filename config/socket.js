/**
 * (CC) 2013 Kernellstudios. Some rights reserved.
 * User: David Morabito
 * Date: 10/14/13
 */

module.exports = function(io) {

    var usernames = [];

    io.sockets.on('connection', function (socket) {

        // when the client emits 'adduser', this listens and executes
        socket.on('adduser', function(user_id, user_name, room_id, room_name){

            socket.user_id = user_id
            socket.user_name = user_name
            socket.room_id = room_id
            socket.room_name = room_name

            usernames.push([socket.user_id, socket.user_name])

            socket.join(socket.room_id);

            socket.emit('updatechat', 'SERVER', 'you have connected to: ' + socket.room_name);
            io.sockets.emit('updateusers', usernames);
            socket.broadcast.to(socket.room_id).emit('updatechat', 'SERVER', socket.user_name + ' has connected to this room');
        });

        // when the client emits 'sendchat', this listens and executes
        socket.on('sendchat', function (data) {
            // we tell the client to execute 'updatechat' with 2 parameters
            io.sockets.in(socket.room_id).emit('updatechat', socket.user_name, data);
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', function(){
            // remove the username from global usernames list

            var username_index = 0;

            usernames.forEach(function(val, key) {
                if(socket.user_id == val[0]) {
                    username_index = key
                }
            })

            delete usernames[username_index];
            // update list of users in chat, client-side
            io.sockets.emit('updateusers', usernames);
            // echo globally that this client has left
            socket.broadcast.to(socket.room_id).emit('updatechat', 'SERVER', socket.user_name + ' has disconnected');
            socket.leave(socket.room_id);
        });
    });
}