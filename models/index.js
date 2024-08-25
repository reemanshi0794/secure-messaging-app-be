
const User = require('./user');
const Contact = require('./contact');
const Message = require('./message');

User.hasMany(Contact, { foreignKey: 'userId' });
User.hasMany(Contact, { foreignKey: 'contactId' });

User.hasMany(Message, { foreignKey: 'senderId' });
User.hasMany(Message, { foreignKey: 'receiverId' });

Contact.belongsTo(User, { foreignKey: 'userId' });
Contact.belongsTo(User, { foreignKey: 'contactId' });

Message.belongsTo(User, { foreignKey: 'senderId' });
Message.belongsTo(User, { foreignKey: 'receiverId' });

module.exports = {
  User,
  Contact,
  Message
};
