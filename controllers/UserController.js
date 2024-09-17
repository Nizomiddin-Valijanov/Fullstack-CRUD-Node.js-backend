const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRound = 10;

require("dotenv").config();

const generateAccessToken = (id) => {
  const payload = {
    id,
    roles: "user",
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Bunday foydalanuvchi mavjud" });
    }

    const hash = await bcrypt.hash(password, saltRound);
    const user = await UserModel.create({
      name,
      email,
      password: hash,
    });
    const token = generateAccessToken(user._id);

    res
      .status(201)
      .json({ message: "User muvafoqiyatli yaratildi", access: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Serverda foydalanuvchini yaratishda xatolik",
    });
  }
};

module.exports = { registerUser };
