const express = require('express');
const multer = require('multer');
const authMiddleWare = require('../middleware/check-auth');

const PostController = require('../controllers/posts');


const router = express.Router();

const MIME_TYPE = {
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE[file.mimetype];
    cb(null, `${name}-${Date.now()}.${ext}`);
  }
})

router.post("", authMiddleWare, multer({storage}).single('image'), PostController.createPost);

router.get('', PostController.getPosts);

router.put('/:id', authMiddleWare, PostController.editPost)

router.get('/:id', PostController.getPost);

router.delete('/:id', authMiddleWare, PostController.deletePost);

module.exports = router;
