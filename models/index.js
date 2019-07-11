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
  table: {},
  sequelize: sequelize
}

db.table.Email = sequelize.import('T_EmailHistory.js')
db.table.User = sequelize.import('T_User.js')

db.table.User.hasMany(db.table.Email, {foreignKey: 'user'})
db.table.Email.belongsTo(db.table.User, {foreignKey: 'user'})

module.exports = db
