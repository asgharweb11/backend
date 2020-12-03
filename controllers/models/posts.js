const mongose = require("mongoose");
const schema = mongose.Schema;


const SchemaPosts = new schema({
    post_id : {
        type : String,
        unique : true,
    },
    user_id : {
        type : schema.Types.ObjectId,
        ref : "users",
    },
    shop_id : {
        type : schema.Types.ObjectId,
        ref : "shop"
    },
    idshop : {
        type : String,
        required : "خطای سرور ، لطفا یکبار صفحه خود را تازه کنید !"
    },
    title : {
        type : String,
        required : "فیلد عنوان محصول ضروری میباشد",
        minlength : 5
    },
    descript : {
        type : String,
        minlength : 100,
        required : "فیلد توضیحات محصول ضروری میباشد ، لطفا تکمیل نمایید"
    },
    category : {
        type : String,
        minlength : 5,
        required : "دسته بندی ای انتخاب نکرده اید !!"
    },
    tags : {
        type : Array,
    },
    price : {
        type : String,
        minlength : 4,
        required : "فیلد قیمت ضروری میباشد ، لطفا تکمیل نمایید"
    },
    number : {
        type : String,
        required : 'لطفا تعداد رو تعیین کنید !'
    },
    photos : {
        type : Array,
    },
    file : {
        type : String,
        required : "لطفا فایل اطلاعات محصول خود را آپلود کنید !!"
    },
    status : {
        type : String,
        required : "خطای سرور لطفا صفحه رو یک بار رفرش کنید"
    },
    date : {
        type : Date,
        default : Date.now()
    },
    update_at : {
        type : Date,
    }
})

module.exports = mongose.model("posts" , SchemaPosts)