// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const uploads = sequelizeClient.define(
    'uploads',
    {
      name: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('AVATAR', 'BROCHURE', 'GALLARY'),
        allowNull: false,
      },
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
  uploads.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return uploads;
};
