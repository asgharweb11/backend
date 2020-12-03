const mongose = require("mongoose");
const schema = mongose.Schema;


const SchemaShops = new schema({
    user_id : {
        type : schema.Types.ObjectId,
        ref : "users",
    },
    title : {
        type : String,
        required : "این فیلد ضروری میباشد !!",
        minlength : 3,
    },
    idshop : {
        type : String,
        required : "این فیلد ضروری میباشد !!",
        minlength : 3
    },
    carsoul : {
        type : Array,
    },
    select : {
        type : String,
    },
    admins : {
        type : Array,
    },
    status : {
        type : String,
    },
    date : {
        type : Date,
        default : Date.now()
    },
    update_at : {
        type : Date,
    }
})

module.exports = mongose.model("shops" , SchemaShops)