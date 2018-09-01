const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, 'use-it-from-properties-for-hash-secret');
    req.userData = {...decodedData}
    next();
  } catch(error) {
    res.status(401).json({
      message: 'Auth Failed.'
    })
  }

}
