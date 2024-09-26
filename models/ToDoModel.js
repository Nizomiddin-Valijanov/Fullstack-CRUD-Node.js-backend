const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  expires: {
    type: Boolean,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = ToDo;
