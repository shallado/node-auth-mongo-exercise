const mongoose = require('mongoose');
const roleModel = require('./role')(mongoose);
const userModel = require('./user')(mongoose);
const { url } = require('../config/db');

const roles = ['user', 'moderator', 'admin'];

const initial = () => {
  const Role = roleModel;

  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      roles.forEach((role) => {
        const newRole = new Role({ name: role });

        newRole.save()
          .then((roleData) => console.log(roleData))
          .catch((err) => console.log({ message: err }));
      });
    }
  });
};

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => {
    console.log('Successfully connected to database');
    initial();
  })
  .catch((err) => console.log('Unable to connect to database', err));

module.exports = {
  mongoose,
  roleModel,
  userModel,
  roles
};