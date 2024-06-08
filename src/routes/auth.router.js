const express = require('express');
const { signupUser, localLoginoginUser } = require('../controllers/auth.controller');

const authRouter = express.Router();




authRouter.post('/signup', signupUser);
authRouter.post('/login', localLoginoginUser)










module.exports = authRouter;