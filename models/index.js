const fs        = require("fs")
const path      = require("path")
const Sequelize = require("sequelize")

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  timezone: 'America/Sao_Paulo',
  define: {
    freezeTableName: true
  }
})

let db = {
  entity: {},
  sequelize: sequelize,
  Sequelize: Sequelize
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
  .forEach(file => {
    let model = sequelize.import(path.join(__dirname, file))
    db.entity[model.name] = model
  })

db.entity['T_User'].hasMany(db.entity['T_EmailHistory'], {foreignKey: 'user'})
db.entity['T_EmailHistory'].belongsTo(db.entity['T_User'], {foreignKey: 'user'})

module.exports = db
