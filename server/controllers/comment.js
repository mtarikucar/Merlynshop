const { models } = require("../database");


// Create a new Product
async function createComment(req, res, next) {
    console.log("burdayımm");
    const { content, userId, productId } = req.body;
    try {
        await models.comment.create({
                content: content,
                userId: userId,
                productId: productId,
            })
        return res.status(200).json({ message: 'Content created successfully' });
    } catch (err) {
        next(err);
    }
}


module.exports = {
    createComment
};