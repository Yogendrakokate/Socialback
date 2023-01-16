const express = require("express")
const { connections } = require("./Config/db")
const { postRoute } = require("./Route/PostRoute")
const { userRoute } = require("./Route/UserRoute")
const { authenticate } = require("./Middleware/authenticate.middleware")
require('dotenv').config()

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("welcom to social media")
})

app.use("/user", userRoute)
app.use(authenticate)
app.use("/post", postRoute)


app.listen(process.env.port, async () => {
    await connections
    console.log(`port running at ${process.env.port}`)
})