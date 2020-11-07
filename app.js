const express = require("express");
const morgan = require("morgan");
const body_parser = require("body-parser");
const { register, login } = require("./database.js");

const app = express();
const port = "8080";

app.use(morgan("tiny"));
app.use(body_parser.json());

// use login.html as index.html + public as static file
app.use('/', express.static('./public', {index: "login.html"}));

app.post("/login", function(req, res){
    const user = req.body;
    const user_id = Object.keys(user)[0];

    login(user, user_id, res);
});

app.patch("/register", function(req, res){
    const user = req.body;
    const user_id = Object.keys(user)[0];

    register(user, user_id, res);
});

app.listen(port, () => {
    const current_time = new Date(Date.now());

    console.log(`[${current_time.getHours()}:${current_time.getMinutes()}] Server is running at localhost:${port}`);
});
