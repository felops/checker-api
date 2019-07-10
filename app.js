require('dotenv').config()
const resources = require('./resources')

resources.models.sequelize.sync().then(() => resources.app.listen(process.env.PORT || 5000))
