module.exports = (app, models) => {
  app.post('/api/v1/email/validate', (req, res) => {
    let post = req.body,
        regex = new RegExp(/[a-z0-9.+_"-]{2,}@[a-z0-9]{2,}[.][a-z0-9]{2,}/i)

    post = {
      ...post,
      user: 'b7220b9f-4a8d-4569-9641-40b5601cddd1',
      isValid: regex.test(post.email)
    }

    models.entity['T_EmailHistory']
      .create(post)
      .then(data => res.json({ data: data }))
  })

  app.get('/api/v1/email', (req, res, next) => {
    models.entity['T_EmailHistory']
      .findAll()
      .then(data => res.json({ data }))
  })

  app.get('/api/v1/email/latest', (req, res, next) => {
    models.entity['T_EmailHistory']
      .findAll({
        limit: 5,
        order: [['createdAt', 'DESC']]
      })
      .then(data => res.json({ data }))
  })
}
