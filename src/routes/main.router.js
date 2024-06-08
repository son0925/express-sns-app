const express = require('express');
const { getLoginView, getSignupView, getMainView } = require('../controllers/main.controller');
const mainRouter = express.Router();


mainRouter.get('/signup', getSignupView);
mainRouter.get('/login', getLoginView);
mainRouter.get('/', getMainView);








module.exports = mainRouter;