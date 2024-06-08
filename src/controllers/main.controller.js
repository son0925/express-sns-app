




const getLoginView = (req,res) => {
  res.render('login');
}
const getSignupView = (req,res) => {
  res.render('signup');
}
const getMainView = (req,res) => {
  res.render('index');
}





module.exports = {
  getLoginView,
  getSignupView,
  getMainView
}