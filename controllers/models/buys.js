const mongose = require("mongoose");
const schema = mongose.Schema;


const SchemaBuys = new schema({
    user_id : {
        type : schema.Types.ObjectId,
        ref : "users",
    },
    posts : {
        type : Array,
        required : "حداقل باید یک محصول باید خریداری شود !"
    },
    total : {
        type : String,
        required : "مجموع قیمت ضروری میباشد !",
        minlength : 5
    },
    file : {
        type : String,
        default : 'مجازی'
    },
    trans_id : {
        type : String,
    },
    factor : {
        type : String,
        required : "بارکد محصول ضروری میباشد !"
    },
    status : {
        type : String,
        required : "لطفا وضعیت محصول رو مشخص نمایید !",
        default : 'خرید موقت'
    },
    date : {
        type : Date,
        default : Date.now()
    },
    update_at : {
        type : Date,
    }
})

module.exports = mongose.model("buys" , SchemaBuys)