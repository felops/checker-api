const bcrypt = require('bcrypt')

module.exports = (app, User) => {
  app.post('/api/v1/user', (req, res) => {
    let post = req.body

    User
      .findOne({ where: { email: post.email } })
      .then(data => {
        if(data) {
          res.status(400).json({ error: 'Email address already in use.' })
        } else {
          bcrypt
            .hash(post.password, 10)
            .then(hash => {
              post = {
                ...post,
                password: hash
              }

              User
                .create(post)
                .then(data => res.json({ data }))
          })
        }
      })
  })
}
