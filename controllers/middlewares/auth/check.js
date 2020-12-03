const User = require("../../models/users")
const Shop = require("../../models/shops")

exports.check = async (req , res , next) => {

    const {email , has_shop = true} = req.body
    const findUser = await User.findOne({email})
    if(findUser === null){
        res.status(400).json({
            status : false,
            msg : "برای انجام اینکار باید وارد حسابتون بشید یا حسابی بسازید !!"
        })
        return false;
    }

    const findShop = await Shop.findOne({user_id : findUser.id})
    if(findShop === null && has_shop == true){
        res.status(400).json({
            status : false,
            msg : "فروشگاه شما یافت نشد !!"
        })
        return false;
    }

    req.user = {
        user_id : findUser.id,
        name : findUser.name,
        lastname : findUser.lastname,
        email : findUser.email,
        photo : findUser.photo,
        shop_id : findShop.id,
        idshop : findShop.idshop,
    }
    next()
}