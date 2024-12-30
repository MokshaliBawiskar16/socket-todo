const asyncHandler = require("express-async-handler")
const Todo = require("../models/Todo")
const { io } = require("../socket/socket-server")
exports.readEmployeeTodo = asyncHandler(async (req, res) => {
    const result = await Todo.find({ employee: req.employee })
    res.json({ message: "todo fetch success", result })
})
exports.completeEmployeeTodo = asyncHandler(async (req, res) => {
    await Todo.findByIdAndUpdate(req.params.tid, { isComplete: true })
    io.emit("send-data",["dell","hp"])
    res.json({ message: "todo complete success" })
})
