const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect(`mongodb+srv://han_217:${process.env.MONGO_ATLAS_PW}@hanscluster-js2nw.mongodb.net/node-angular`, { useNewUrlParser: true } )
  .then(() => {
    console.log('Connected to database!')
  })
  .catch((err) => {
    console.log('Connection failed :(');
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
  next();
});

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);



module.exports = app;
