const express = require("express")
const { PostModel } = require("../Model/PostModel")


const postRoute = express.Router()

postRoute.get("/", (req, res) => {
    res.send("All the post")
})

postRoute.post("/create", async(req, res) => {
    const payload = req.body
    try {
        const post_new = new PostModel(payload)
        await post_new.save()
        res.send("create success")
    } catch (err) {
        console.log({ "err": "something went wrong" })
        
   }
})
postRoute.patch("/update/:id", async(req, res) => {
    const payload = req.body
    const id = req.params.id
    const post = await PostModel.findOne({ "_id": id })
    const post_id = post.user_id
    const post_id_mak = req.body.user_id
    
    try {
        /*if (post_id_mak !== post_id) {
            res.send({ "msg":"error"})
        }*/
        /*else {*/
            await PostModel.findByIdAndUpdate({ "_id": id }, payload)
            res.send("update the post")
        /*}*/
        
    } catch (err) {
        console.log(err)
        res.send({"msg":"something went wrong"})
    }
  
})

postRoute.delete("/delete/:id", async(req, res) => {
    const id = req.params.id
    try {
        await PostModel.findByIdAndDelete({ "_id": id })
        res.send("deleted the post")
    } catch (err) {
        console.log(err)
        res.send({"msg":"something went wrong"})
    }
})



module.exports = {
    postRoute
}