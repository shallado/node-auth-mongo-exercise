const { roles, roleModel, userModel } = require('../models');

const User = userModel;

exports.checkDuplicateEmailAndUsername = (req, res, next) => {
  const { email, username } = req.body;
  // find email in user collection
  User.findOne({ email })
    .then((userDataPrimary) => {
      if (userDataPrimary) {
        res.status(400).send({ message: 'email is already taken try again' });
      }

      User.findOne({ username })
        .then((userDataSecondary) => {
          if (userDataSecondary) {
            res.status(400).send(userDataSecondary);
          }

          next();
        })
        .catch((err) => res.status(500).send({ 
          message: 'username is already taken try again' 
        }));
    })
    .catch((err) => res.status(500).send({ message: err }));
};

exports.checkRolesExist = (req, res, next) => {
  const { roles: rolesInputs } = req.body;

  rolesInputs.forEach((role) => {
    if (!roles.includes(role)) {
      res.status(400).send({ message: 'role does not exist try again' });
    }
  });

  next();
};