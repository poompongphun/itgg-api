const bcrypt = require("bcryptjs");
const usersValidation = require("../../Middleware/validation/users.middleware");
const users = require("../../Models/users");

/* create users */
const createUser = async (req, res, next) => {
  // Validate
  const validation = usersValidation.createUsers(req.body);
  if (validation.hasOwnProperty("error"))
    return res.status(400).json(validation.error.details[0].message);
  else {
    if (!validation.value.password)
      validation.value.password = Date.now().toString();
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validation.value.password, salt);
    // Create new user
    const user = new users({
      name: validation.value.name,
      nickname: validation.value.nickname,
      email: validation.value.id + "@it.kmitl.ac.th",
      password: hashedPassword,
    });
    try {
      const createUser = await user.save();
      res.json({ user: createUser._id });
    } catch (error) {
      res.status(400).json(error);
    }
  }
};
module.exports = { createUser };
