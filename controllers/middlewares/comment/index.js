const Users = require('../../models/users')
const Comments = require('../../models/comments')
const jalaali = require('jalaali-js')
// ----------- Method -------------------
const { date } = require('../../../methods/date')

exports.PostComment = async (req , res) => {
    try {
        const {post_id , text} = req.body
        const {user_id , shop_id , idshop} = req.user

        const date = new Date()
        const setTime = new Date(date.getTime() - (1000*60*60)) // یک ساعت بعد
        // const setTime = new Date(date.getTime() - 1000)
        const findCommentUser = await Comments.find({user_id , post_id , date : {$gte : setTime}})
        if(findCommentUser.length > 0){
            return res.status(400).json({
                status : false,
                msg : 'هر یک ساعت ، فقط یک کامنت میشود ثبت کرد !'
            })
        }


        const insertComment = await new Comments({
            user_id,
            post_id,
            text,
        }).save()
        
        res.status(200).json({
            status : true,
            data : {
                text : insertComment.text,
                date : insertComment.date
            }
        })
    } catch (error) {
        res.status(400).json({
            status : false,
            msg : 'خطای سرور !!'
        })
        console.log('error page : Comments : ' , error)
    }
    
    
}


exports.allComments = async (req , res) => {
    try {
        const {post_id=1} = req.query
        let data = []
        const getCom = await Comments.find({post_id}).select('user_id post_id date text sub_comments').sort({date : -1})
        
        if(getCom.length < 0){
            return res.status(400).json({
                status : false,
                msg : 'کامنتی یافت نشد !!'
            })
        }
        
        
        for(let topCom of getCom){
            const user = await Users.findById(topCom.user_id).select('name lastname email photo')
            if(topCom.sub_comments.length <= 0){
                data.push({
                    name : user.name,
                    lastname : user.lastname,
                    email : user.email,
                    photo : user.photo,
                    id : topCom._id,
                    text : topCom.text,
                    date : date(topCom.date)
                })
            } else {
                let sub_comments = []
                const data_sub = topCom.sub_comments.sort((a,b) => a.date - b.date);
                for(let subCom of data_sub){
                    const subUser = await Users.findById(subCom.user_id).select('name lastname email photo')
                    sub_comments.push({
                        name : subUser.name,
                        lastname : subUser.lastname,
                        email : subUser.email,
                        photo : subUser.photo,
                        id : subCom._id,
                        text : subCom.text,
                        date : date(topCom.date),
                    })
                }
                data.push({
                    name : user.name,
                    lastname : user.lastname,
                    email : user.email,
                    photo : user.photo,
                    id : topCom._id,
                    text : topCom.text,
                    date : date(topCom.date),
                    sub_comments
                })
            }
            
        }
        //console.log('user : ' , data)
        res.status(200).json({
            status : true,
            data
        })
    } catch (error) {
        res.status(400).json({
            status : false,
            msg : 'خطای سرور !!'
        })
        console.log('error page : get all Comments post : ' , error)
    }
}


exports.PostAnswer = async (req , res) => {
    try {
        const {id , post_id , text} = req.body
        const {user_id , name , lastname , email , photo} = req.user

        const findPostComm = await Comments.findById(id)
        if(!findPostComm || findPostComm === undefined || null){
            return res.status(400).json({
                status : false,
                msg : 'کامنت مورد نظر یافت نشد ، برای پاسخ گویی !'
            })
        }

        const date = new Date()
        const setTime = new Date(date.getTime() - (1000*60*60)) // یک ساعت بعد
        const findCommentUser = await Comments
            .findById(id)
            .elemMatch('sub_comments' , {user_id , date : {$gte: setTime}})

        // if(findCommentUser !== null || undefined){
        //     return res.status(400).json({
        //         status : false,
        //         msg : 'هر یک ساعت ، فقط یک کامنت میشود ثبت کرد !'
        //     })
        // }

        // user_id text date
        const insertComp = await Comments
            .updateOne(
                {_id : id},
                {$push : {sub_comments : {user_id , text}}}
            )
        if(insertComp.ok === 1){
            const data = {
                name,
                lastname,
                email,
                photo,
                text,
                date : new Date(),
                top_id : id,
            }
            res.status(200).json({
                status : true,
                data
            })
        } else {
            res.status(400).json({
                status : false,
                msg : 'خطای سرور !!'
            })
        }
    } catch (error) {
        res.status(400).json({
            status : false,
            msg : 'خطای سرور !!'
        })
        console.log('error page : Comments : ' , error)
    }
    
    
}
