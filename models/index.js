const mongoose = require('mongoose');
const roleModel = require('./role')(mongoose);
const userModel = require('./user')(mongoose);
const { url } = require('../config/db');

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log('Successfully connected to database'))
  .catch((err) => console.log('Unable to connect to database'));

module.exports = {
  mongoose,
  roleModel,
  userModel,
  roles: ['user', 'moderator', 'admin']
};