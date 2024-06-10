const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/controllerAuth');

const validator = require('../middlewares/validator.js');

const { dataRegister, dataLogin } = require('../validations/auth.js');

router.post('/register', validator(dataRegister), register);

router.post('/login', validator(dataLogin), login);

module.exports = router;