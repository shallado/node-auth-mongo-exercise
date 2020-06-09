const roleModel = (mongoose) => {
  const roleSchema = new mongoose.Schema({
    name: String
  });

  const Role = mongoose.model('Role', roleSchema);

  return Role;
};

module.exports = roleModel;