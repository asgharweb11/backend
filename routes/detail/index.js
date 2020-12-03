const express = require('express')
const router = express.Router();
const fs = require("fs")


router.get("/files/:idshop/:photo" , (req , res) => {

    const param = req.params;
    const idshop = req.params.idshop
    let dir = '';

    res.writeHead(200 , {"Content-Type" : 'image/jpeg'})
    const photo = param.photo
    dir = `public/details/photos/${idshop}/${photo}`;

    fs.readFile(dir , (err , data) => {
        if(err){
            fs.readFile('public/other/404.jpg' , (err , data) => {
                if(err) throw err
                res.end(data)
            })
        }else {
            res.end(data)
        }
    
    })     

})

module.exports = router;