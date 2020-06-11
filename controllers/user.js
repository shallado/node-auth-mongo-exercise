exports.publicAccess = (req, res) => {
  res.send('All Content No Credentials Needed');
};

exports.userBoard = (req, res) => {
  res.send('User Content');
};

exports.adminBoard = (req, res) => {
  res.send('Admin Content');
};

exports.moderatorBoard = (req, res) => {
  res.send('Moderator Content');
};