const mongose = require('mongoose')
const schema = mongose.Schema;

const ShcemaComments = new schema({
    user_id : {
        type : schema.Types.ObjectId,
        ref : "users"
    },
    post_id : {
        type : schema.Types.ObjectId,
        ref : 'posts'
    },
    title : {
        type : String
    },
    text : {
        type : String,
        minlength : 10,
        required : 'قسمت توضیحات ضروری میباشد !'
    },
    sub_comments : [
        {
            user_id : { type : schema.Types.ObjectId , ref : 'users'},
            title : {type : String},
            text : {type : String , minlength : 10 , required : 'قسمت توضیحات ضروری میباشد !'},
            status : {type : String , default : 'در حال بررسی'},
            date : {type : Date , default : Date.now()}
        }
    ],
    status : {
        type : String,
        default : 'در حال بررسی'
    },
    date : {
        type : Date,
        default : Date.now()
    },
    update_at : {
        type : Date
    }
})

module.exports = mongose.model('comments' , ShcemaComments)
