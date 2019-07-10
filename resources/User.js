module.exports = (app, models) => {
  app.post('/api/v1/user', (req, res) => {
    let post = req.body

    models.entity['T_User']
      .findOne({ where: { email: post.email } })
      .then(data =>
        data ?
          res.status(400).json({ error: 'Email already in use.' }) :
          models.entity['T_User']
            .create(post)
            .then(data => res.json({ data }))
      )
  })
}
