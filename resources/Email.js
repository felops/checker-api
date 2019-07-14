module.exports = (app, Email, sequelize, isLoggedIn) => {
  app.post('/api/v1/email/validate', isLoggedIn, (req, res) => {
    let { email } = req.body,
        regex = new RegExp(/[a-z0-9.+_"-]{2,}@[a-z0-9]{2,}[.][a-z]{2,}/i)

    Email
      .create({
        email: email,
        user: req.user.id,
        isValid: regex.test(email)
      })
      .then(data => res.json({ data: data }))
  })

  app.get('/api/v1/email', isLoggedIn, (req, res) => {
    Email
      .findAll({
        where: {
          user: req.user.id
        }
      })
      .then(data => res.json({ data }))
  })

  app.get('/api/v1/email/latest', isLoggedIn, (req, res) => {
    Email
      .findAll({
        where: {
          user: req.user.id
        },
        order: [['createdAt', 'DESC']],
        limit: 5
      })
      .then(data => res.json({ data }))
  })

  app.get('/api/v1/email/kpi', isLoggedIn, (req, res) => {
    sequelize.query(
      'SELECT ' +
      	'( ' +
          'SELECT COUNT(id) ' +
          'FROM T_EmailHistory ' +
          'WHERE user = ? ' +
        ') totalEmails, ' +
      	'( ' +
          'SELECT COUNT(id) ' +
          'FROM T_EmailHistory ' +
          'WHERE user = ? ' +
          'AND   isValid = 1 ' +
        ') validEmails',
      {
        replacements: [req.user.id, req.user.id],
        type: sequelize.QueryTypes.SELECT
      }
    )
      .then(data => res.json({ data: data[0] }))
  })
}
