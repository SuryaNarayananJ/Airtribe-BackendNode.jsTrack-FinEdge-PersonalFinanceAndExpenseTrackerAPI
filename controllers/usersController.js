const userService = require("../services/userService");

const registerUser = async (req, res, next) => {
  try {
    const newUser = await userService.registerUser(req.body);
    res.send({
      message: "Registration Successful",
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const token = await userService.loginUser(req.body);
    res.send({
      message: "Login Successful",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
