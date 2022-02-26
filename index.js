const express = require('express')
const mysql = require('mysql')

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'nodemysql'
});

// connect
db.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('MySQL CONNECTED...');
});

const app = express();

// create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result)=>{
        if(err) throw err
        console.log(result)
        res.send('database created...')
    })
})

// create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), primary KEY (id))';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...')
    })
})

app.get('/addpost1', (req, res) => {
    let post = {title:'Post One', body:'This is post one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.send('Post 1 added...')
    })
})

app.get('/addpost2', (req, res) => {
    let post = {title:'Post TWO', body:'This is post two'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.send('Post 2 added...')
    })
})

// select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results)=>{
        if(err) throw err;
        console.log(results)
        res.send('Posts fetched...')
    })
})

// select single posts
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts where id = ${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.send('Post fetched...')
    })
})

// update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title'
    let sql = `UPDATE posts SET title = '${newTitle}' where id = ${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.send('Post updated...')
    })
})

// delete post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts where id = ${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.send('Post deleted...')
    })
})

app.listen('3000',()=>{
    console.log('Server started on port 3000')
})