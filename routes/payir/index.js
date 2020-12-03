const express = require('express')
const router = express.Router()
// ----------------
const {paying , verify , status} = require('../../controllers/middlewares/pay')
// ---------
const { findUser } = require('../../controllers/middlewares/pay/user')
const { findProduct } = require('../../controllers/middlewares/pay/product')
// --------
const { payCheckUser } = require('../../controllers/middlewares/validator/checks')
const { auth } = require('../../controllers/middlewares/validator/results')

router.post('/' , payCheckUser , auth , findUser , findProduct , paying)
router.get('/verify' , status)
router.post('/verify' , findUser , verify)



module.exports = router;