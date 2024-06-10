const express = require('express');
const { signupUser, localLoginoginUser, isNotLoginned } = require('../controllers/auth.controller');

const authRouter = express.Router();




authRouter.post('/signup',isNotLoginned, signupUser);
authRouter.post('/login',isNotLoginned, localLoginoginUser);










module.exports = authRouter;