// passport 미들웨어
const passport = require('passport');
const User = require('../models/users.model');
const LocalStrategy = require('passport-local').Strategy;


// 로컬전략은 회원 유저 정보를 확인하고 검사하고 보내주는 미들웨어 역할이다
passport.use('local',new LocalStrategy({usernameField: 'email', passwordField: 'password'},
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

// 로그인을 했을 때 세션을 생성하고 저장한다
// 서버에는 세션 데이터가 클라이언트에게는 세션 식별자를 저장한다
passport.serializeUser((user, done) => {
  return done(null, user.id);
})

// 유저가 페이지를 들어갈 때마다 deserializeUser가 호출된다
// 이때 id를 통해서 유저의 정보를 가져온다
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  return done(null, user);
})

module.exports = passport;