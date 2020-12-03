const express = require("express")
const router = express.Router();
const Users = require("../../models/users")
const cookie = require("cookie")
const jwt = require("jsonwebtoken")

exports.logined = async (req , res) => {
    try {
        console.log("hello")
        const token = await req.header("x-auth-FRENL32-token")
        if(!token || token === undefined || token === "undefined"){
            res.status(400).json({
                status : false,
                msg : "شما عضو سایت نیستید !!"
            })
            return false;
        }

        const decode = jwt.verify(token , process.env.SECRET).user
        if(!decode){
            res.status(400).json({
                status : false,
                msg : "شما عضو سایت نیستید"
            })
            return false;
        }

        const FindUser = await Users.findById(decode.id).select("-password");

        if(!FindUser){
            return res.status(400).json({error : "شما عضو سایت نمی باشید !!"});
        }

        res.status(200).json({
            status : true,
            data : {
                name : FindUser.name,
                lastname : FindUser.lastname,
                email : FindUser.email,
                bio : FindUser.bio,
                shareit : FindUser.shareit,
                status : FindUser.status,
                date : FindUser.date,
                update_at : FindUser.update_at
            }
        })

        // --------------------------------------------------------------------------------

    } catch (error) {
        console.log("error page Login MiddleWare : " , error)
    }

}