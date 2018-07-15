module.exports = function (io, Users, _) {

    const users = new Users();

    io.on('connection', (socket) => {
        console.log('User Connected');

        socket.on('join', (params, callback) => {
            socket.join(params.room);

            users.AddUserData(socket.id, params.name, params.room);
            var arr = _.uniq(users.GetUsersList(params.room), 'username');
            console.log(params.name);
            io.to(params.room).emit('usersList', arr );

            callback();
        });

        socket.on('createMessage', (message, callback) => {
            console.log(message);
            io.to(message.room).emit('newMessage', {
                text: message.text,
                room: message.room,
                from: message.sender
            });
            callback();
        });

        socket.on('disconnect',()=>{
            var user = users.RemoveUser(socket.id);
            if(user){
                var arr = _.uniq(users.GetUsersList(user.room), 'username');

            io.to(user.room).emit('usersList', arr);
            }
        });

        
    });
}