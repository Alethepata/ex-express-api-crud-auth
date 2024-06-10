const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = (user, expiresIn = '1h') => jwt.sign(user, process.env.JWT_SECRET, { expiresIn });