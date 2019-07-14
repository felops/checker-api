module.exports = (app, passport) => {
  app.post('/api/v1/auth/login',
    passport.authenticate('local'),
    (req, res) => {
      res.json({ data: req.user })
    }
  )

  app.get('/api/v1/auth/logout', (req, res) => {
    if(req.logout) {
      req.logout()
    }

    res.end()
  })
}
