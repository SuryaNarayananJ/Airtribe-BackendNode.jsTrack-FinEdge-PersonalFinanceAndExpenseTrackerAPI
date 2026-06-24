const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const SALT_ROUND = 5;
const jwt = require("jsonwebtoken");

const registerUser = async (user) => {
  user.password = await bcrypt.hash(user.password, SALT_ROUND);
  const DBuser = await usersModel.create(user);
  return DBuser;
};

const loginUser = async ({ email, password }) => {
  const DBuser = await usersModel.findOne({ email });
  if (!DBuser) {
    throw new Error("User Not Found");
  }
  const isSimilarPassword = await bcrypt.compare(password, DBuser.password);
  if (!isSimilarPassword) {
    throw new Error("Incorrect Password");
  }

  const jwtPayload = {
    id: DBuser._id,
    name: DBuser.name,
    role: DBuser.role,
  };

  const new_token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return new_token;
};

module.exports = {
  registerUser,
  loginUser,
};
