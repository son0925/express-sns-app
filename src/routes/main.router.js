const express = require('express');
const { getLoginView, getSignupView, getMainView } = require('../controllers/main.controller');
const { isNotLoginned, isLoginned } = require('../controllers/auth.controller');
const mainRouter = express.Router();


mainRouter.get('/signup',isNotLoginned, getSignupView);
mainRouter.get('/login',isNotLoginned, getLoginView);
mainRouter.get('/',isLoginned, getMainView);








module.exports = mainRouter;