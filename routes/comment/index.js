const express = require('express')
const router = express.Router()

const {PostComment , allComments , PostAnswer } = require('../../controllers/middlewares/comment')
const {check} = require('../../controllers/middlewares/auth/check')

router.post('/' , check , PostComment) // post top Comments Post
router.get('/all' , allComments) // get Comments Post id
router.post('/answer' , check , PostAnswer) // post sub Comments Post id

module.exports = router