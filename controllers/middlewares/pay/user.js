const User = require('../../models/users')
exports.findUser = async (req , res , next) => {
    try {
        const email = req.body.email;
        if(!email || email === undefined || email === null ){
            return res.status(400).json({
                status : false,
                msg : 'برای خرید باید حساب درون سایت داشته باشید !!'
            })
        }

        await User.find({email}).exec((err , data) => {
            if(err){
                return res.status(200).json({
                    status : false,
                    msg : 'برای خرید باید حساب درون سایت داشته باشید !!'
                })
            }

            console.log('find user : ' , data[0]._id)
            req.body.user_id = data[0]._id
            next()
        })

    } catch (error) {
        console.log('page middleware pay : ' , error)
        return res.status(200).json({
            status : false,
            msg : 'خطا ، مشکلی پیش آمده ، چنانچه خطا رفع نمیشود ، لطفا با پشتیبانی تماس بگیرید !!'
        })
    }
}