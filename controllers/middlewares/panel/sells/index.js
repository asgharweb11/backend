const Buys = require('../../../models/buys')
const moment = require('moment')

// --------------- Get Sells This Weeks -----------
exports.sellsWeek = async (req , res) => {

    try {
        const idshop = req.params.idshop

        const curr = new Date;
        const firstday = curr.setDate(curr.getDate() - 2) // اول هفته
        const lastday = curr.setDate(curr.getDate() - curr.getDay()+6) // آخر هفته
        console.log('get : ' , firstday)
        // -------------------------------------------
        const getPosts = await Buys.find({posts : { $elemMatch : {idshop} } , date : {$gte : firstday , $lte : new Date() }}).select("posts date").sort({date : 1})
        if(getPosts.length > 0){
            res.status(200).json(getPosts)
        }else {
            res.status(400).json({
                status : false,
                msg : 'موردی یافت نشد !'
            })
        }
    } catch (error) {
        console.log('errors page Payments This Week : ' , error)
        res.status(400).json({
            status : false,
            msg : 'خطای سرور !'
        })
    }
}