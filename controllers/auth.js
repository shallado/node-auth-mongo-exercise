const bcrypt = require('bcrypt');
const { userModel, roleModel } = require('../models');

const User = userModel;
const Role = roleModel;

exports.signup = (req, res) => {
  const { username, email, password, roles } = req.body;

  bcrypt.hash(password, 8)
    .then((hash) => {
      const user = new User({
        username,
        email,
        password: hash
      });

      user.save()
        .then((userDataPrimary) => {
          if (roles) {
            Role.find({
                name: {
                  $in: roles
                }
              })
              .then((rolesDataPrimary) => {
                userDataPrimary.roles = rolesDataPrimary.map((role) => 
                  role._id
                );

                userDataPrimary.save()
                  .then((userDataSecondary) => res.send(userDataSecondary))
                  .catch((err) => res.status(500).send({
                    message: err
                  }));
              })
              .catch((err) => res.status(500).send({
                message: err
              }));
          } else {
            Role.find({ name: 'user' })
              .then((rolesDataSecondary) => {
                userDataPrimary.roles[0] = rolesDataSecondary._id

                userDataPrimary.save()
                  .then((userDataSecondary) => res.send(userDataSecondary))
                  .catch((err) => res.status(500).send(err));
              })
              .catch((err) => res.status(500).send({ message: err }));
          }
        })
        .catch((err) => res.status(500).send({ message: err }));
        })
    .catch((err) => res.status(500).send({ message: err }));
};

