const session = require('express-session')
const express = require("express");
const users = require('./public/database');

const app = express()

const PORT = 4000;

// use static files
app.use(express.static("public"));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use ejs views
app.set("view engine", "ejs");
app.set("views", "views");

const sess = {
    secret: 'ausazko hitz multzoa',
    cookie: {}
}
app.use(session(sess))

app.post('/user', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    console.log("here")
    if (user) {
        req.session.userid = username;
        res.json({ success: true });

    } else {
        res.json({ success: false, message: 'Invalid username or password' });
    }
});



app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/',(req,res) => {
    if(req.session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
        res.redirect('form.html')
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);})
