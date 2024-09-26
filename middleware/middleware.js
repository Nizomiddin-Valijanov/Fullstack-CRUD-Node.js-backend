const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Kichik harf bilan
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Received Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Auth token mavjud emas" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "Bunday foydalanuvchi mavjud emas" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ message: "Token noto‘g‘ri yoki muddati tugagan" });
  }
};

// Meni validatsiyalarni chiroy qilib jo'natadigon funksiyam
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().reduce(
        (acc, item) => ({
          ...acc,
          [item.path]: acc[item.path]
            ? [...acc[item.path], item.msg]
            : [item.msg],
        }),
        {}
      ),
    });
  }
  next();
};

module.exports = { authenticateToken, validateRequest };
