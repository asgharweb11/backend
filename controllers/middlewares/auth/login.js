const express = require("express")
const router = express.Router();
const Users = require("../../models/users")
const bcrypt = require("bcryptjs")
const cookie = require("cookie")
const jwt = require("jsonwebtoken")


exports.login = async (req , res) => {
    try {

        const { email , password } = req.body;
        const expires = Date.now() + 87000000; // 24h


        if(email === ""){
            res.status(400).json({
                status : false,
                msg : "لطفا ایمیل صحیحی وارد نمایید"
            })
            return false;
        }
        
        const FindUser = await Users.findOne({email})

        if(!FindUser){
            console.log(FindUser)
            return res.status(400).json({
                status : false,
                msg : "ایمیل و پسوردی با مشخصات شما یافت نشد !!"
            });
        }

        await bcrypt.compare(password , FindUser.password , function(err , check){
            if(err) throw err;
            if(check){

                const payload = {
                    user : {
                        id : FindUser._id,
                        email
                    }
                }

                jwt.sign(payload , process.env.SECRET , {expiresIn : expires} , (err , token) => {
                    if(err) throw err
                    res.status(200).json({
                        status : true,
                        msg : "به پنل کاربری وارد شدید !!",
                        data : {
                            name : FindUser.name,
                            lastname : FindUser.lastname,
                            email : FindUser.email,
                            bio : FindUser.bio,
                            shareit : FindUser.shareit,
                            status : FindUser.status,
                            date : FindUser.date,
                            update_at : FindUser.update_at,
                            token
                        }
                    })
        
                })
                
            }else {
                res.status(400).json({
                    status : false,
                    msg : "ایمیل و پسوردی با مشخصات شما یافت نشد !!"
                });
            }
        })
        
    } catch (error) {
        console.log("error page Login : " , error)
    }

}