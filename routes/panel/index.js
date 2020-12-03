const express = require('express')
const router = express.Router()
// -----------------
const {sellsWeek} = require('../../controllers/middlewares/panel/sells')

router.get('/api/sells/week/:idshop' , sellsWeek)


module.exports = router