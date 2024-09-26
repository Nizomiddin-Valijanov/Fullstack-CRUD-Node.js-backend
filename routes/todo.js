const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  validateRequest,
  authenticateToken,
} = require("../middleware/middleware");
const { createToDo } = require("../controllers/ToDoController");

// Validation rules for ToDo creation
const ToDoValidation = [
  check("title", "To-Do nomi bo'sh bo'lmasligi kerak").notEmpty(),
  check(
    "expires",
    "To-Do amal qilish muddati bo'sh bo'lmasligi kerak"
  ).notEmpty(),
  check("user_id", "User id bo'lishi kerak").notEmpty(),
];

/**
 * @swagger
 * components:
 *   schemas:
 *     ToDo:
 *       type: object
 *       required:
 *         - title
 *         - expires
 *         - user_id
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the ToDo item
 *         expires:
 *           type: boolean
 *           description: Indicates whether the ToDo is expired
 *         user_id:
 *           type: string
 *           description: ID of the user who created the ToDo
 *       example:
 *         title: "Buy groceries"
 *         expires: false
 *         user_id: "12345"
 */

/**
 * @swagger
 * /todo/create:
 *   post:
 *     summary: Yangi To-Do Yaratish uchun 
 *     tags: [ToDo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ToDo'
 *     responses:
 *       201:
 *         description: ToDo successfully created
 *       400:
 *         description: Validation errors or invalid token
 *       500:
 *         description: Server error
 */
router.post(
  "/create",
  ToDoValidation,
  validateRequest,
  authenticateToken,
  createToDo
);

module.exports = router;
