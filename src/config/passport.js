// passport 미들웨어
const passport = require('passport');
const User = require('../models/users.model');
const LocalStrategy = require('passport-local').Strategy;


// 로컬전략은 회원 유저 정보를 확인하고 검사하고 보내주는 미들웨어 역할이다
passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
  async (email, password, done) => {
    try {
      // 유저 찾기
      const exUser = await User.findOne({email: email.toLowerCase()});
      if (!exUser) {
        return done(null, false, {msg: `Email ${email} not found`})
      }

      // 비밀번호 검사
      exUser.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, exUser);
        }
        return done(null, false, {msg: `Invalid email or password`})
      })
    } catch (error) {
      return done(error);
    }

  }
))

passport.serializeUser((user, done) => {
  return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  return done(null, user);
})

module.exports = passport;