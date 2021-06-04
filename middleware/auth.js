
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    if (req.url === '/'){
      req.flash('warning_msg', '請先輸入帳號密碼才能使用')
    }
    res.redirect('/users/login')
  }
}