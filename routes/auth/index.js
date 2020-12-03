const express = require("express")
const router = express.Router();
//-----------------
const { login } = require("../../controllers/middlewares/auth/login")
const { register } = require("../../controllers/middlewares/auth/register")
const { logined } = require("../../controllers/middlewares/auth/logined")
const {  shop } = require("../../controllers/middlewares/auth/shop")
// ------------------------
const { login : CLogin , register : CRegister , createShop } = require("../../controllers/middlewares/validator/checks")
const { auth } = require("../../controllers/middlewares/validator/results")



// ---- LOGIN USER --------
router.post("/login" , CLogin , auth , login)

// ---- REGISTER USER -----
router.post("/register" , CRegister , auth , register);

// ---- Logined USER -----
router.get("/logined" , logined)

// ---- Make Shop && Register User -----
router.post("/makeshop" , createShop , auth , shop)

module.exports = router