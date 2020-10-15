// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define(
    'users',
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(254),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      userType: {
        type: DataTypes.ENUM('STUDENT', 'INSTITUTION', 'ADMIN'),
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      // IF A INSTITUTION
      institutionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      avatarId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      googleId: { type: Sequelize.STRING },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    users.hasMany(models.uploads);
  };

  return users;
};
