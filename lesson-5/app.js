const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const db_conf = require('./config/config.js')
const conn = mysql2.createConnection(db_conf)
const path = require('path');
const bodyParser = require('body-parser');
const templating = require("consolidate");
const pool = mysql2.createPool(db_conf);

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


//connect to database
pool.getConnection((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

//set views file
app.set('views', path.join(__dirname, 'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//route for homepage
app.get('/', (req, res) => {
    let sql = "SELECT * FROM mail_list";
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('index', {
            title: "Список рассылки",
            results: results
        });
    });
});

//route for insert data
app.post('/save', (req, res) => {
    let data = { first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email };
    let sql = "INSERT INTO mail_list SET ?";
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//update
app.post('/update', (req, res) => {
    let sql = "UPDATE mail_list SET first_name='" + req.body.first_name + "', last_name='" + req.body.last_name + "', email='" + req.body.email + "' WHERE id=" + req.body.id;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//delete
app.post('/delete', (req, res) => {
    let sql = "DELETE FROM mail_list WHERE id=" + req.body.id + "";
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('listening on 3000');
})
