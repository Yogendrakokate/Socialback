const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    user_id:String
})

const PostModel = mongoose.model("posti",postSchema )

module.exports = {
    PostModel
}