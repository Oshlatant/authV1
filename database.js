const fs = require("fs");
const hash = require("object-hash");

const read_db = function(callback){
    fs.readFile("./db.json", {encoding: "utf-8"}, function(err, data){
        if(err){
            console.error("Impossible de lire le fichier :(");
            return;
        }

        const users = JSON.parse(data);

        callback(users);
    });
}

const write_db = function(data){
    fs.writeFile("./db.json", JSON.stringify(data, null, 4), function(err){
        if(err){
            console.error(":(");
            return;
        }
        console.log("Ok !");
    });
}

const check_user_id = function(users, user_id){
    return user_id in users;
}

const hash_password = function(user, user_id){
    user[user_id] = hash(user[user_id], {algorithm: "sha512"});
}
const set_response = function(res, code, message){
    res.writeHead(code, {
        "Content-Type": "text/plain"
    })
    res.end(message);
}

exports.login = function(user, user_id, res){
    read_db(function(users){
        if(user_id in users){
            hash_password(user, user_id);
            
            if(user[user_id] === users[user_id]){
                set_response(res, 200, "Logging...");
                return;
            }

            set_response(res, 400, "Passwords doesn't match");
            return;
        }

        set_response(res, 400, "User not found");
    });
}

exports.register = function(user, user_id, res){
    if(user.password_check !== user[user_id]){
        set_response(res, 400, "Passwords not equals");
        return;
    }

    read_db(function(users){
        if(!check_user_id(users, user_id)){
            hash_password(user, user_id);

            users[user_id] = user[user_id];

            write_db(users);
            set_response(res, 200, `User ${user_id} added to database.`);
            return;
        }

        set_response(res, 400, "Username already taken");
    });
}