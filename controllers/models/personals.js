const mongose = require('mongoose')
const schema = mongose.Schema


const SchemaPersonal = new schema({
    user_id : {
        type : schema.Types.ObjectId,
        ref : "users",
    },
    shop_id : {
        type : schema.Types.ObjectId,
        ref : "shops",
    },
    name : {
        type : String,
        required : "فیلد نام ضروری میباشد"
    },
    mobile : {
        type : String,
        required : "فیلد شماره موبایل ضروری میباشد",
    },
    addr : {
        type : String,
    },
    shaba : {
        type : String,
        required : "شماره شبا محصول ضروری میباشد !"
    },
    card_melli : {
        type : String,
        required : "کارت ملی محصول ضروری میباشد !"
    },
    wallet : {
        type : String,
    },
    status : {
        type : String,
        default : 'در حال بررسی'
    },
    date : {
        type : Date,
        default : Date.now()
    },
    update_at : {
        type : Date,
    }
})

module.exports = mongose.model("personals" , SchemaPersonal)