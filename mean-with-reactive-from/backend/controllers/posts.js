const Post = require('../models/post');

exports.createPost = (req, res) => {
  const url = `${req.protocol}://${req.get('host')}`;
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: `${url}/images/${req.file.filename}`,
    creator: req.userData.userId
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post created successfully",
      post: {
        ...createdPost,
        id: createdPost._id
      }
    })
  });
};

exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  let postQuery = Post.find();
  let fetchedPosts;
  if(pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
 postQuery
  .then(documents => {
    fetchedPosts = documents;
    return Post.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts:fetchedPosts,
      count
    })
  })
};

exports.editPost = (req, res) => {
  const postId = req.params.id;
  const post = new Post({
    _id: postId,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: postId, creator: req.userData.userId}, post)
  .then((result) => {
    if(result.n > 0) {
      return res.status(200).json({
        message: "Updated successfully!"
      })
    } else {
      return res.status(401).json({
        message: 'Auth Failed.'
      })
    }
  })
};

exports.getPost = (req, res) => {
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
};

exports.deletePost = (req, res) => {

  const postId = req.params.id;
  Post.deleteOne({_id:postId, creator: req.userData.userId})
  .then((result) => {
    if(result.n > 0) {
      return res.status(200).json({
        message: 'Post deleted successfully!'
      })
    }
    res.status(401).json({
      message: 'Not Authorized to delete.'
    });
  });
};
