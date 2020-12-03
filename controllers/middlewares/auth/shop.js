const User = require("../../models/users")
const Shop = require("../../models/shops")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {v4 : uuidv4} = require("uuid")
const sharp = require("sharp")
const fs = require("fs")
const path = require("path")
// ----------------
const JpegSharp = require("../plugins/sharp")


exports.shop = async (req , res) => {

    const files = req.files && req.files.files;
    const {name , lastname , email , password , title , idshop , status} = req.body
    const expires = Date.now() + 87000000; // 24h
    const url = path.join(__dirname , "../../../../");

    try {

        // ------- Register User
            
        const findUser = await User.findOne({email})
        if(findUser !== null && status === "false"){
            res.status(400).json({
                status : false,
                msg : "این ایمیل در سامانه وجود دارد ، لطفا از ایمیل دیگری استفاده نمایید !!"
            })
            return false;
        }

        //-------- Make Shop
        const FindShop = await Shop.findOne({idshop});
        if(FindShop !== null){
            res.status(400).json({
                status : false,
                msg : "این آیدی که برای فروشگاه خود انتخاب کرده اید ، توسط فروشگاه دیگری استفاده شده !!"
            })
            return false; 
        }
        let idPhotos;
        await fs.access(`${url}/public/details/photos/${idshop}` , async (err) => {
            if(err) {
                await fs.mkdir(`${url}/public/details/photos/${idshop}` ,async (err) => {
                    if(err) throw err
                    idPhotos = req.files === null ? [] : await JpegSharp(files , idshop , url)
                })
            }
        })
        // upload photos
        //----------------------------------------------------------------
        // Register User without save()
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password , salt)
        const InsertUser = await new User({
            name,
            lastname,
            email,
            password : hashPass,
        })

        const InserShop = await new Shop({
            user_id : status === "false" ? InsertUser._id : findUser._id,
            title,
            idshop,
            carsoul : idPhotos
        })
        await InserShop.save()
        //----------------------------------------------------------------
        if(status === "false"){
            const payload = {
                user : {
                    id : InsertUser._id,
                    name : InsertUser.name,
                    lastname : InsertUser.lastname,
                    email : InsertUser.email,
                },
            }

            return await jwt.sign(payload , process.env.SECRET , { expiresIn : expires} , async (err , token) => {
                if(err) throw err
                // -------------------------------------------
                await InsertUser.save()
                return res.status(200).json({
                    status : true,
                    msg : "تبریک ، در حال انتقال به داشبورد ...",
                    user : {
                        name,
                        lastname,
                        email,
                        token
                    },
                    shop : {
                        title,
                        idshop,
                        carsouls : idPhotos
                    }
                })
                
            })
        }

        return res.status(200).json({
            status : true,
            msg : "تبریک ، در حال انتقال به داشبورد ...",
            shop : {
                title,
                idshop,
                carsoul : idPhotos
            }
        })

    } catch (error) {
        res.status(500).json({
            status : false,
            msg : "خطای سرور لطفا مجدد تلاش نمایید !!"
        })
        console.log("Page Make Shop : " , error)
    }


    
}
