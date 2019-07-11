module.exports = (app, models, isLoggedIn) => {
  app.post('/api/v1/email/validate', isLoggedIn, (req, res) => {
    let { email } = req.body,
        regex = new RegExp(/[a-z0-9.+_"-]{2,}@[a-z0-9]{2,}[.][a-z]{2,}/i)

    models.entity['T_EmailHistory']
      .create({
        email: email,
        user: req.user.id,
        isValid: regex.test(email)
      })
      .then(data => res.json({ data: data }))
  })

  app.get('/api/v1/email', isLoggedIn, (req, res) => {
    models.entity['T_EmailHistory']
      .findAll({
        where: {
          user: req.user.id
        }
      })
      .then(data => res.json({ data }))
  })

  app.get('/api/v1/email/latest', isLoggedIn, (req, res) => {
    models.entity['T_EmailHistory']
      .findAll({
        where: {
          user: req.user.id
        },
        order: [['createdAt', 'DESC']],
        limit: 5
      })
      .then(data => res.json({ data }))
  })
}
