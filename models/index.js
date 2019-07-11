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

db.entity['T_EmailHistory'] = sequelize.import(path.join(__dirname, 'T_EmailHistory.js'))
db.entity['T_User'] = sequelize.import(path.join(__dirname, 'T_User.js'))

db.entity['T_User'].hasMany(db.entity['T_EmailHistory'], {foreignKey: 'user'})
db.entity['T_EmailHistory'].belongsTo(db.entity['T_User'], {foreignKey: 'user'})

module.exports = db
