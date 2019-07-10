const express = require('express')
const app = express()
const models = require('../models')
const bodyParser = require('body-parser')
const fs = require("fs")
const path = require("path")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let server = {
  app: app,
  models: models
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
  .forEach(file => require('./' + file)(server.app, server.models))

module.exports = server
