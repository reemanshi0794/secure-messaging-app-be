const { DataTypes } = require('sequelize');
const sequelize = require('../config/db/index');
const User = require('./user');

const Message = sequelize.define('Message', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});



module.exports = Message;
