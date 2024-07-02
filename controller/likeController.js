const Post = require('../model/post');  
const Like = require('../models/like'); 

const toogleLike = async (req, res) => {
    const userId = req.userId;  
    const { postId } = req.params;

    try {
        
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        
        const existingLike = await Like.findOne({ userId, postId });

        if (existingLike) {
             
        deletedLike=    await Like.deleteOne({ _id: existingLike._id });
            return res.status(200).json({ message: 'Post unliked' });
        } else {
             
            const newLike = new Like({ userId, postId });
            await newLike.save();
            return res.status(201).json({ message: 'Post liked' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports =  toogleLike ;
