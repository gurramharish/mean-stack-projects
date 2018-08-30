const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
  next();
});

app.post("/api/posts", (req, res) => {
  console.log('Post data : ', req.body);
  res.status(200).json({
    message: "Post created successfully"
  })
});

app.get('/api/posts', (req, res, next) => {
 const posts = [
   {
     id: 'ffaa929',
     title: 'First post from server',
     content: 'This is from server side'
   },
   {
    id: 'ueyu37',
    title: 'Second post from server',
    content: 'This is from server side!'
  }
 ];
 res.status(200).json({
   message: 'Posts fetched successfully',
   posts
 })
})






module.exports = app;
