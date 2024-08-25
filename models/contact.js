const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Contact = sequelize.define('Contact', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  contactId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  }
}, {
  tableName: 'Contacts', // Optional: explicitly set table name
  timestamps: true, // Ensures createdAt and updatedAt columns are included
});


module.exports = Contact;
