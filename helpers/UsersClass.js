class Users {
    constructor() {
        this.users = [];
    }

    AddUserData(id, name, room) {
        var users = { id, name, room }; //ES6 object destructuring
        this.users.push(users);
        return users;
    }

    RemoveUser(id){
        var user = this.GetUser(id);
        if(user){
            this.users = this.users.filter((user)=> user.id !== id)
        }
        return user;
    }

    GetUser(id){
        var getUser = this.users.filter((user)=> {
            return user.id ===id;
        })[0];
        return getUser;
    }

    GetUsersList(room) {
        var users = this.users.filter((user) => user.room === room);

        var namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
    }
}

module.exports = { Users };