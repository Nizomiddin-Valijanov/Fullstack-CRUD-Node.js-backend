const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/UserController");
const {
  authenticateToken,
  validateRequest,
} = require("../middleware/middleware");
// Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - todo_id
 *       properties:
 *         name:
 *           type: string
 *           description: Foydalanuvchining ismi
 *         email:
 *           type: string
 *           description:  Emaili
 *         password:
 *           type: string
 *           description: Paroli
 *         todo_id:
 *           type: string
 *           description: To-Do id-si
 *       example:
 *         name: "Folonchi"
 *         email: "example@gmail.com"
 *         password: "12345"
 *         todo_id: "_id"
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Yangi foydalanuvchini registratsya qilish
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli yaratildi
 *       400:
 *         description: Validation errors or invalid token
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login qilish
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli login bo'ldi
 *       400:
 *         description: Validation errors or invalid token
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user/user-info:
 *   get:
 *     summary: Foydalanuvchiga token orqali malumotlarini ko'rish
 *     tags: [User]
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli topildi
 *       400:
 *         description: Validation errors or invalid token
 *       500:
 *         description: Server error
 */

// Register uchun validatsiya
const registerValidation = [
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

// Login uchun validatsiya
const loginValidation = [
  check("email")
    .notEmpty()
    .withMessage("Email bo'sh bo'lmasligi kerak")
    .isEmail()
    .withMessage("Yaroqli email bo'lishi kerak"),
  check("password", "Parol bo'sh bo'lmasligi kerak").notEmpty(),
];

router.post("/register", registerValidation, validateRequest, registerUser);
router.post("/login", loginValidation, validateRequest, loginUser);
router.get("/user-info", authenticateToken, getUserInfo);

module.exports = router;
