const router = require("express").Router();

const { verifyToken } = require("../middlewares/verifyToken");

const {createComment} = require('../controllers/comment');

// Create a new comment
router.post('/',verifyToken,  createComment);



module.exports = router;