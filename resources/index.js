const express = require('express')
const app = express()
const models = require('../models')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const slowDown = require("express-slow-down")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

passport.use(new LocalStrategy({ usernameField : 'email' },
  (email, password, done) => {
    models.table.User
      .findOne({ where: { email: email } })
      .then((user, err) => {
        if (err) { return done(err) }
        if (!user) { return done(null, false) }

        bcrypt
          .compare(password, user.dataValues.password)
          .then(res =>
            res ?
              done(null, {
                id: user.dataValues.id,
                firstName: user.dataValues.firstName,
                lastName: user.dataValues.lastName,
                email: user.dataValues.email
              }) :
              done(null, false)
          )
      })
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  models.table.User
    .findByPk(id)
    .then((user, err) => done(err, user.dataValues))
})

app.use(session({
  store: new FileStore({
    path : './sessions/'
  }),
  secret: 'JaRUtWQUBhDXnOTYc92SXetVosWGojsq',
  resave: true,
  saveUninitialized: false,
  secret: 'uq3hJsVFiT2vCCZnVxzsPIDOoGSUOKZX'
}))
app.use(passport.initialize())
app.use(passport.session())

isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
      return next()

  res.status(302).redirect('/sign-in')
}

// slow down after 3 failed attempts to log in
app.use('/api/v1/auth/login', slowDown({
  windowMs: 30 * 60 * 1000,  // 30 minutes
  delayAfter: 3,
  delayMs: 500
}))

// import the API resources
require('./Auth.js')(app, models, passport)
require('./Email.js')(app, models, isLoggedIn)
require('./User.js')(app, models, isLoggedIn)

module.exports = {
  app: app,
  models: models
}
