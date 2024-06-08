const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.router');
const mainRouter = require('./routes/main.router');
const passport = require('passport');
const session = require('express-session');
const MemoryStore = require('session-memory-store')(session);
require('dotenv').config();


// 클라이언트의 요청 header가 application/json 일 때 실행되는 미들웨어이다
// body의 json 객체를 파싱하여 req.body에 저장을 한다
app.use(express.json());
// 클라이언트가 URL-encoded 데이터를 보냈을 때 실행되는 미들웨어이다
// extends를 사용하여 모듈을 설정하고 데이터를 파싱하여 req.body에 객체로 저장한다
// extends true일 땐 qs 외부 모듈을 사용하고 false 일 땐 querystring 내장 모듈을 사용한다
// qs 모듈은 복잡한 배열, 객체일 때 유용하며 , querystring 모듈은 간단한 객체일 때 사용하기 유용하다
app.use(express.urlencoded({ extended: false }));
// 세션 정보 생성
app.use(session({
  // 세션 데이터의 무결성을 위한 키
  secret: 'Super Key',
  // 요청 처리 중 세션 데이터가 변경되지 않아도 세션을 다시 저장힐지 여부
  resave: false,
  // 초기화되지 않은 세션을 저장할지 여부
  saveUninitialized: true,
  // 세션 데이터를 저장하는 장소 db, memory등이 있다
  store: new MemoryStore({ checkPeriod: 1000 * 60 * 30}),
  // 쿠키가 없다면 세션도 없다 쿠키 옵션 설정
  cookie: {
    // 기간 ms단위이기 때문에 1000을 곱하고 시작
    maxAge: 1000 * 60 * 30,
    // http에서만 조작이 가능하다 js로는 조작 불가능
    httpOnly: true,
  }
}))


// view Engine SetUp
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// 정적 파일 제공
app.use(express.static(path.join(__dirname, '../public')));


// 서버 미들웨어
app.use(passport.session());
app.use(passport.initialize());
require('./config/passport');


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {console.log("MongoDB Connected")})
  .catch((err) => {console.log("MongoDB Err: " + err)})


// 서버 라우터
app.use('/auth', authRouter);
app.use('/', mainRouter);






// 서버 리스너
const port = 4000;
app.listen(port, () => {
  console.log(`Server Listener on ${port}`)
})