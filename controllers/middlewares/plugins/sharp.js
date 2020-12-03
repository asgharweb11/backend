const {v4 : uuidv4} = require("uuid")
const sharp = require("sharp")

function JpegSharp (files , idshop , url) {
    return new Promise((resolve , reject) => {
        let getidPhotos = [];
        if(files.length === undefined){
            const split = files.name.split(".")
            const format = split[split.length - 1];
            const idphoto = uuidv4()
            //-----------------------------------------------
            sharp(files.data)
                .resize(800)
                .jpeg({ quality : 80})
                .toFile(`${url}/public/details/photos/${idshop}/${idphoto}.${format}`, (err, info) => {
                    if(err) reject(err)
                });
            getidPhotos.push(idphoto + '.' + format)
        } else {
            for(let i=0;i<files.length;i++) {
                const split = files[i].name.split(".")
                const format = split[split.length - 1];
                const idphoto = uuidv4()
                //-----------------------------------------------
                sharp(files[i].data)
                    .resize(800)
                    .jpeg({ quality : 80})
                    .toFile(`${url}/public/details/photos/${idshop}/${idphoto}.${format}`, (err, info) => {
                        if(err) reject(err)
                    });
                getidPhotos.push(idphoto + '.' + format)
                    
            }
        }
        resolve(getidPhotos)
    })
    
        
}

module.exports = JpegSharp;