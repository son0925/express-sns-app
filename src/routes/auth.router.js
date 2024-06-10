const express = require('express');
const { signupUser, localLoginoginUser, isNotLoginned, logoutUser, isLoginned, googlePassport } = require('../controllers/auth.controller');
const passport = require('passport');
const authRouter = express.Router();


authRouter.get('/google', passport.authenticate('google'));
authRouter.get('/google/callback', passport.authenticate('google', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login'
}))
authRouter.post('/signup',isNotLoginned, signupUser);
authRouter.post('/login',isNotLoginned, localLoginoginUser);
authRouter.post('/logout',isLoginned, logoutUser);










module.exports = authRouter;