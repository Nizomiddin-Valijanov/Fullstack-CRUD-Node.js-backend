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
  const { name, email, password, todo_id } = req.body;
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
      todo_id,
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

const loginUser = async (req, res) => {
  const { email, password, todo_id } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Bunday foydalanuvchi mavjud emas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Parol noto'g'ri" });
    }

    const token = generateAccessToken(user._id);
    res.status(200).json({
      access: token,
      user_data: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Serverda foydalanuvchini tekshirishda xatolik",
    });
  }
};

const getUserInfo = async (req, res) => {
  const user = req.user;

  if (!user) {
    return req.status(404).json({ message: "Foydalanuvchi topilmadi" });
  }
  res.status(200).json({
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
};

module.exports = { registerUser, loginUser, getUserInfo };
