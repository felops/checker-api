module.exports = function(sequelize, DataTypes) {
  return sequelize.define('T_User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    password: {
      type: DataTypes.CHAR(60).BINARY,
      allowNull: false,
      defaultValue: ''
    },
    firstName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: ''
    }
  })
}
