const ToDoModel = require("../models/ToDoModel");

const createToDo = async (req, res) => {
  const { user_id, title, created, expires } = req.body;

  try {
    if (user_id !== req.user_id) {
      return req
        .status(400)
        .json({ message: "Noto'g'ri foydalanuvchi id kiritilgan!" });
    }
    const newTodo = await ToDoModel.create({
      user_id,
      title,
      created,
      expires,
    });

    return res
      .status(201)
      .json({ message: "ToDo muvaffaqiyatli yaratildi", newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverda xatolik yuz berdi" });
  }
};

const getTodo = async (user_id) => {
  try {
    const todo = ToDoModel.find({ user_id });
    return todo;
  } catch (error) {
    console.error("Todoni olishda xatolik");
    return null;
  }
};

module.exports = { createToDo, getTodo };
