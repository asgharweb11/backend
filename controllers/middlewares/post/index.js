const Products = require("../../models/posts")

exports.posts = async (req , res) => {
    const page = req.query.id
    if(page === undefined){
        return res.status(400).json({
            status : false,
            msg : 'محصولی یافت نشد !!'
        })
    }

    const posts = await Products.find({}).limit(21).skip((page-1) * 21).sort({ field: 'desc', title : 1 }).select({user_id : 0 , shop_id : 0})
    const count = await Products.find({}).countDocuments() / 21;  
    res.status(200).json({
        status : 200,
        msg : "محصولات",
        data : posts,
        limit : Math.ceil(count)
    })

}