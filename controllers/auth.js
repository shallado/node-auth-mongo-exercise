const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel, roleModel } = require('../models');
const { secretKey } = require('../config/auth');

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

exports.signin = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }).populate('roles', '-__v').exec()
    .then((userDataPrimary) => {
       if (!userDataPrimary) {
          res.status(404).send({ message: 'user not found try again' });
       }

       bcrypt.compare(password, userDataPrimary.password, (err, result) => {
         if (err) {
           res.status(400).send('invalid password try again');
         }

         jwt.sign({ id: userDataPrimary._id }, secretKey, (err, token) => {
           if (err) {
             res.status(500).send(err.message);
           }

           userDataPrimary.accessToken = token;

           userDataPrimary.save()
            .then((userDataSecondary) => res.send({
              message: 'Successfully logged in',
              userDataSecondary
            }))
            .catch((err) => res.status(500).send({ message: err }));
         });
       });
    })
    .catch((err) => res.status(500).send({ message: err }));
};