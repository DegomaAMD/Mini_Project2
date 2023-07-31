const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection(
    {
        user: "root" ,
        host: "localhost" ,
        password:"" ,
        database: "vizmakerdb",
    }
)

app.post('/register', (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    con.query("INSERT INTO users (email, username, password) VALUES (?,?,?)", 
        [email, username, password],
        (err,result) => {
            if(result){
                res.send(result);
            }else{
                res.send({message: "Enter correct details"})
            }
        }
    )
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    con.query("SELECT * FROM users WHERE username = ? AND password = ?", 
    [username, password],
        (err, result) => {
            if(err){
                req.setEncoding({err: err});
            }else{
                if(result.length > 0){
                    res.send(result);
                }else{
                    res.send({message: "Wrong username or password"});
                }
            }
                
        }
    )
})

app.post('/messages', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const message = req.body.message;
    con.query("INSERT INTO messages (firstname, lastname, email, message) VALUES (?,?,?,?)", 
    [firstname, lastname, email, message],
    (err,result) => {
            if(result){
                res.send(result);
            }else{
                res.send({message: "Please complete the fields provided."})
            }
        }
    )
})


app.listen(3002,() => {
    console.log("Server is running");
})
