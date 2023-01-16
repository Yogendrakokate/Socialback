const express = require("express")
const { UserModel } = require("../Model/UserModel")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const userRoute = express.Router()

userRoute.get("/", (req, res) => {
    res.send("enter in to user")
})

userRoute.post("/register", async (req, res) => {
    const { name, email, gender, password } = req.body
    try {
        bcrypt.hash(password, 10, async(err, secure)=> {
            if (err) {
               console.log(err)
            } else {
        const user =new UserModel({name,email,gender,password:secure})
        await user.save()
        res.send("Data added")
        console.log(user)
           }
        });
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})




userRoute.post("/login", async (req, res) => {
    const {email,password} = req.body
    try {
        
        const user = await UserModel.find({ email})
       
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({user_id:user[0]._id},"masai")
                    res.send({ "mas": "login succesful", "token": token })
                } else {
                    res.send("wrong credentials")
                }
                
            });
            
        } else {
            res.send("wrong credentials")
       }
    } catch (err) {
        console.log(err)
        res.send("error")

    }
})



module.exports = {
    userRoute
}