const express = require("express")
const app = express()
const http = require("http").createServer(app)
const db = require("./config/db")
const bodyParser = require("body-parser")
const cors = require("cors")
const fileUpload = require("express-fileupload")

require('dotenv').config();

db();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(fileUpload({
    createParentPath : true
}));


if(process.env.NODE_ENV == 'development'){
    app.use(cors())
}

if (typeof localStorage === "undefined" || localStorage === null) {
    console.log('hello ...)')
    let LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
 }

//--------------------------------------------------------
const auth = require("./routes/auth")
const post = require("./routes/post")
const comment = require("./routes/comment")
const detail = require("./routes/detail")
const payment = require('./routes/payir')
// ------------------------------ Dashboard Or Panel --------------------------------
const panel = require('./routes/panel')

// ----------------------------------------- Main -----------------------------------
app.use("/api/auth" , auth)
app.use("/api/post" , post)
app.use('/api/comment' , comment)
app.use("/detail" , detail)
app.use('/payment' , payment) // Payment

// ------------------------------ Dashboard Or Panel --------------------------------
app.use('/panel' , panel) // panel/api/ posts,comments,payments,...


http.listen(PORT , (err) => {
    if(err) throw err
    console.log("hello asghar")
})