const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://han_217:han_217@hanscluster-js2nw.mongodb.net/node-angular?retryWrites=true', { useNewUrlParser: true } )
  .then(() => {
    console.log('Connected to database!')
  })
  .catch((err) => {
    console.log('Connection failed :(');
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
  next();
});

app.post("/api/posts", (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post created successfully",
      id: createdPost._id
    })
  });
});

app.get('/api/posts', (req, res, next) => {
 Post.find()
  .then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts:documents
    })
  })
})

app.delete('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  Post.deleteOne({_id:postId})
  .then(() => {
    res.status(200).json({
      message: 'Post deleted successfully!'
    })
  });
});




module.exports = app;
