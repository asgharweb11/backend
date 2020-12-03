const express = require("express")
const router = express.Router();
// -------------------
const { insert } = require("../../controllers/middlewares/post/insert")
const { posts } = require("../../controllers/middlewares/post")
const { getPost } = require("../../controllers/middlewares/post/post")
// ----------
const {check} = require("../../controllers/middlewares/auth/check")

router.post("/insert" , check , insert)
router.get("/" , posts)
router.get("/get/:id" , getPost)

module.exports = router;