module.exports = (req, res, next) => {
  const { users } = res;

  const blogUser = users.map(user => ({
    ...user,
    name: user.name.toUpperCase()
  }));

  res.status(200).json(blogUser);

  next();
};
