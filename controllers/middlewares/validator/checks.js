const { check } = require("express-validator")

exports.login = [
    check("email" , "فیلد ایمیل ضروری میباشد ، لطفا ایمیل صحیحی وارد نمایید !!")
        .notEmpty()
        .isEmail(),
    check("password" , "فیلد پسورد شما نباید خالی یا کمتر از 6 کارکتر باشد !!")
        .notEmpty()
        .isLength({ min : 5}),
]


exports.register = [
    check("name" , "فیلد نام ضروری میباشد")
        .notEmpty()
        .isLength({ min : 2}),
    check("lastname" , "فیلد نام خانوادگی ضروری میباشد")
        .notEmpty()
        .isLength({ min : 2}),
    check("email" , "فیلد ایمیل ضروری میباشد ، لطفا ایمیل صحیحی وارد نمایید !!")
        .notEmpty()
        .isEmail(),
    check("password" , "فیلد پسورد شما نباید خالی یا کمتر از 6 کارکتر باشد !!")
        .notEmpty()
        .isLength({ min : 5}),
]

exports.createShop = [
    check("name" , "فیلد نام ضروری میباشد")
        .notEmpty()
        .isLength({ min : 2}),
    check("lastname" , "فیلد نام خانوادگی ضروری میباشد")
        .notEmpty()
        .isLength({ min : 2}),
    check("email" , "فیلد ایمیل ضروری میباشد ، لطفا ایمیل صحیحی وارد نمایید !!")
        .notEmpty()
        .isEmail(),
    check("password" , "فیلد پسورد شما نباید خالی یا کمتر از 6 کارکتر باشد !!")
        .notEmpty()
        .isLength({ min : 5}),
    check("title" , "فیلد عنوان فروشگاه شما نباید خالی و کمتر از 3 کارکتر باشد !!")
        .notEmpty()
        .isLength({ min : 2}),
    check("idshop" , "لطفا آیدی فروشگاه شما نباید خالی و کمتر از 5 کارکتر باشد !!")
        .notEmpty()
        .trim()
        .isLength({ min : 5}),
]


exports.payCheckUser = [
    check("email" , "برای خرید باید حساب درون سایت داشته باشید !!")
        .notEmpty()
        .isEmail(),
]
