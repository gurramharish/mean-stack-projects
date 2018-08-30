const express = require('express');
const Post = require('../models/post');


const router = express.Router();

router.post("", (req, res) => {
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

router.get('', (req, res, next) => {
 Post.find()
  .then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts:documents
    })
  })
})

router.put('/:id', (req, res) => {
  const postId = req.params.id;
  const post = new Post({
    _id: postId,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: postId}, post)
  .then((result) => {
    res.status(200).json({
      message: "Updated successfully!"
    })
  })
})

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: 'Post not found'
      })
    }
  })
});

router.delete('/:id', (req, res) => {
  const postId = req.params.id;
  Post.deleteOne({_id:postId})
  .then(() => {
    res.status(200).json({
      message: 'Post deleted successfully!'
    })
  });
});

module.exports = router;
