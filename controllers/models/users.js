const mongose = require("mongoose")
const schema = mongose.Schema;

const SchemaUsers = new schema({

    name : {
        type : String,
        required : "این فیلد ضروری میباشد !!",
        minlength : 2,
    },
    lastname : {
        type : String,
        required : "این فیلد ضروری میباشد !!",
        minlength : 2.
    },
    email : {
        type : String,
        required : "این فیلد ضروری میباشد !!",
        minlength : 5,
        unique : true
    },
    password : {
        type : String,
        required : "این فیلد ضروری میباشد !!",
        minlength : 5,
    },
    photo : {
        type : String,
    },
    bio : {
        type : String,
    },
    sharite : {
        type : Array,
    },
    date : {
        type : Date,
        default : Date.now()
    },
    update_at : {
        type : Date,
    }

})

module.exports = mongose.model("users" , SchemaUsers)