// server tutorial
// https://www.youtube.com/watch?v=EN6Dx22cPRI&t=434s&ab_channel=TraversyMedia 

// napojeni na frontend
// https://www.youtube.com/watch?v=19CcxzZHwuI&ab_channel=THESHOW

const express = require('express')
const mysql = require('mysql')
const axios = require('axios')
const bodyParser = require('body-parser');


// create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // password: '123456',
  database : 'nodesql'
});

//conect
db.connect((err)=>{
  if (err) {
    throw err;
  }
  console.log('mysql conected ...')
})

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/', (req, res) => { 
  res.json({"pozdrav": ["hello","cau"]})
})

// create DB 
app.get('/createdb',(req,res) =>{
  let sql = 'CREATE DATABASE nodesql';
  db.query(sql,(err,result) => {
    if(err) throw err
    console.log(result)
    res.send('database created !')
  })
})

// create table 
app.get('/createpoststable', (req, res) => {
  let sql = 'CREATE TABLE `posts` (id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err,result) => {
    if(err) throw err;
    console.log(result);
    res.send('posts table created !');
  });
});

// create post 1
// app.get('/addpost', (req, res) => {
//   let post = { title: 'post one', body: 'this is post number one' };
//   // let post = { result.body }
  
//   let sql = 'INSERT INTO posts SET ?';
//   let query = db.query(sql, post, (err,result) => {
//     if(err) throw err;
//     res.send(result);
//   });
// });

app.post('/addpost', (req, res) => {
  let mujobject = req.body
  // console.log('Got body:', mujobject);
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, mujobject, (err,result) => {
    if(err) throw err;
    res.send(result);
  });
});

//select posts
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err,results) => {
    if(err) throw err;
    // console.log(results);
    res.send(results);
  });
});

//select single posts
app.get('/getpost/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id =${req.params.id}`;
  let query = db.query(sql, (err,results) => {
    if(err) throw err;
    console.log(results);
    res.send('post fetched!');
  });
});

// // update post 

app.get('/updatepost/:id', (req, res) => {
  let newTitle = 'updated title';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id =${req.params.id}`;
  let query = db.query(sql, (err,result) => {
    if(err) throw err;
    console.log(result);
    res.send('post updated!');
  });
});

// delete post 

app.get('/deletepost/:id', (req, res) => {
  let sql = `DELETE FROM posts WHERE id =${req.params.id}`;
  let query = db.query(sql, (err,result) => {
    if(err) throw err;
    res.send(result);
  });
});


app.listen('3001', ()=> {
  console.log('server stareted on 3001');
})
