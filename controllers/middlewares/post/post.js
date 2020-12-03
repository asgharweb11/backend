const Products = require("../../models/posts")

exports.getPost = async (req , res) => {

    const id = req.params.id
    await Products.findOne({post_id : id}).select({user_id : 0 , shop_id : 0}).exec((err , data) => {
        if(err) {
            res.status(404).json({
                status : false,
                msg : 'محصول شما یافت نشد'
            })
            return false
        }
        res.status(200).json({
            status : 200,
            msg : "محصول یافت شد",
            data
        })
    })

}