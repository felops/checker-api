module.exports = (app, models, passport) => {
  app.post('/api/v1/auth/login', (req, res, next) => {
    let post = req.body

    models.entity['T_User']
      .findOne({
        attributes: ['email', 'firstName', 'lastName', 'phone'],
        where: {
          email: post.email,
          password: post.password
        }
      })
      .then(data =>
        data ?
          res.json({ data }) :
          res.status(400).json({ error: 'Incorrect email or password' })
      )
  })
}
