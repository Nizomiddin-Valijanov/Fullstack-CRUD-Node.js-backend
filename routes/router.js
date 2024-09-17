const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { registerUser } = require("../controllers/UserController");

const userValidation = [
  check("name", "Ism bo'sh bo'lmasligi kerak").notEmpty(),
  check("email")
    .notEmpty()
    .withMessage("Email bo'sh bo'lmasligi kerak")
    .isEmail()
    .withMessage("Yaroqli email bo'lishi kerak"),
  check("password", "Parol minimal 4 dan 8 ta gacha bo'lishi kerak").isLength({
    min: 4,
    max: 8,
  }),
];
router.post(
  "/auth/register",
  userValidation,
  (req, res, next) => {
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
  },
  registerUser
);

router.get("/info", (req, res) => {
  res.status(200).json({ message: "server works correctly" });
});

module.exports = router;
