const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")
const { adminProtected, employeeProtected } = require("./middlewares/protected.middleware")
const { app, httpServer } = require("./socket/socket-server")
require("dotenv").config()

// const app = express()
app.use(express.json()) // req.body
app.use(cookieParser()) // req.cookies
app.use(express.static("dist"))
app.use(cors({
    // origin: "http://localhost:5173",
    origin: "https://socket-todo-29bj.onrender.com",
    credentials: true
}))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/admin", adminProtected, require("./routes/admin.routes"))
app.use("/api/employee", employeeProtected, require("./routes/employee.route"))
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname,"dist","index.html"))
    // res.status(404).json({ message: "reource not found" })
})
// express error handler
app.use((err, req, res, next) => {
    if (err) {
        console.log(err)
        return res.status(500).json({ message: "something went wrong" })
    }
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("mongo connected")
    httpServer.listen(process.env.PORT, console.log("server running"))
})
