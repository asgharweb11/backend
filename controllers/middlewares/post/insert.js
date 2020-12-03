const User = require("../../models/users")
const Shops = require("../../models/shops")
const Posts = require("../../models/posts")
const fs = require("fs")
const path = require("path")
const { v4 : uuid4 } = require("uuid")
/// ----------------
const JpegSharp = require("../plugins/sharp")

exports.insert = async (req , res) => {
    try {
        const {title , descript , category , tags , price , number , submit} = req.body;
        console.log('number : ' , number)
        const { photos } = req.files;
        const { file } = req.files;
        // ---------- Middle Find User And Shop
        const {user_id , shop_id , idshop} = req.user;
        // ----------
        const url = path.join(__dirname , "../../../");

        let idPhotos;
        await fs.access(`${url}/public/details/photos/${idshop}` , async (err) => {
            if(err) {
                await fs.mkdir(`${url}/public/details/photos/${idshop}` ,async (err) => {
                    if(err) throw err
                    idPhotos = req.files.photos === null ? [] : await JpegSharp(photos , idshop , url)
                })
            }else{
                idPhotos = req.files.photos === null ? [] : await JpegSharp(photos , idshop , url)
            }
        })

        const split = file.name.split(".");
        const format = split[split.length - 1];
        const idfile = uuid4()
        const secret = process.env.SECRET_FILE
        await file.mv(`${url}/public/details/files-${secret}/${idshop}/` + idfile + "." + format);

        const setfile = idfile + '.' + format;


        const insert = await new Posts({
            post_id : await Posts.find({}).count() + 1,
            user_id,
            shop_id,
            idshop,
            title,
            descript,
            category,
            tags,
            price,
            number,
            photos : idPhotos,
            file : setfile,
            status : submit
        })

        await insert.save();
        res.status(200).json({
            status : true,
            msg : "محصول شما با موفقیت ذخیره شد ، نهایتا حداکثر 10 ساعت دیگر در فروشگاه شما منتشر خواهد شد",
        })



    } catch (error) {
        res.status(400).json({
            status : false,
            msg : "خطای سرور ، لطفا مجدد تلاش نمایید !!"
        })
        console.log("Erros Page Inser : " , error)
    }
}