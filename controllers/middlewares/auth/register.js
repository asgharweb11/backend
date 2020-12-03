const express = require("express")
const router = express.Router();
const Users = require("../../models/users")
const bcrypt = require("bcryptjs")
const cookie = require("cookie")
const jwt = require("jsonwebtoken")
//-----------------


exports.register = async (req , res) => {
    //const {db} = await connectToDatabase();
  
    const {name , lastname , email , password} = req.body;
    const expires = Date.now() + 87000000; // 24h

    try {
        const findUser = await Users.findOne({email})
        if(findUser){
            res.status(400).json({
                status : false,
                msg : "این ایمیل در سامانه وجود دارد ، لطفا از ایمیل دیگری استفاده نمایید !!"
            })
            return false;
        }

        console.log("find user : " , findUser)
  
        const salt = await bcrypt.genSalt(10)
        const setPass = await bcrypt.hash(password , salt);

        const InserUser = await new Users({
            name,
            lastname,
            email,
            password : setPass,
            date : Date.now(),
        })

        const payload = {
            user : {
                id : InserUser._id,
                name : InserUser.name,
                lastname : InserUser.lastname,
                email : InserUser.email,
            }
        }

        // JWT
        jwt.sign(payload , process.env.SECRET , {expiresIn : expires} , async (err , token) => {
            // Error
            if(err) throw err;
            res.status(200).json({
                status : true,
                msg : "خوش آمدید",
                data : {
                    name,
                    lastname,
                    email,
                    date : Date.now(),
                    token
                }
            });

            await InserUser.save()
        })

    } catch (error) {
      console.log("error page Register : " , error)
    }
}