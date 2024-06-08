const User = require("../models/users.model")
const bcrypt = require('bcryptjs');
const passport = require('passport');





// 회원가입
const signupUser = async (req,res) => {
  // 정보 확인
  const { email, password } = req.body;
  if (!email || !password) {
    // 400 정보 입력하지 않은 경우
    return res.status(400).json({msg: '모든 정보를 입력해주세요'})
  }

  // 기존 유저인지 확인
  const exUser = await User.findOne({email});
  if (exUser) {
    // 409 서버에 자원이 이미 존재할 때
    return res.status(409).json({msg: '이미 존재하는 회원입니다'})
  }

  // 비밀번호 Hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    email: email.toLowerCase(), 
    password: hashedPassword
  });

  // 신규 유저 저장
  try {
    await user.save();
    return res.status(201).json({msg: '회원가입 완료'})
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: '회원가입 에러 발생'})
  }
}

// 로컬 로그인
const localLoginoginUser = (req,res,next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({msg: info})
    }
    // 로그인
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    })
  })(req,res,next)
}






module.exports = {
  signupUser,
  localLoginoginUser,
}