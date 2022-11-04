import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;  // gets the starting index of every page
        const total = await postMessage.countDocuments({});

        const posts = await postMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);     // sort({ _id: -1 }) gives us the newest posts first
        
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch(err) {
        res.status(404).json({ message: err }); 
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postMessage.findById(id);
        res.status(200).json(post);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i')
        const posts = await postMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]  });

        res.json({ data: posts });
    } catch(err) {
        res.status(404).json({ message: err.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new postMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch(err) {
        res.status(409).json({ message: err });
    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that ID");

    try {
        const updatedPost = await postMessage.findByIdAndUpdate(_id, { ...post, _id }, {new: true});
    
        res.json(updatedPost);
        
    } catch(err) {
        console.log(err);
    }
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that ID");
    
        await postMessage.findByIdAndRemove(_id);
    
        res.json({message: 'Post deleted successfully'});
        
    } catch (err) {
        console.log(err);
    }

}

export const likePost = async (req, res) => {
    const {id} = req.params;

    try {
        if(!req.userId) return res.json({ message: "Unauthenticated" });
        
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that ID");
    
        const post = await postMessage.findById(id);
    
        const index = post.likes.findIndex((id) => id === String(req.userId));
    
        if(index === -1) {
            // LIKE
            post.likes.push(req.userId);
        } else {
            // DISLIKE
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }
    
        const updatedPost = await postMessage.findByIdAndUpdate(id, post, {new: true});
    
        res.json(updatedPost);
    } catch(err) {
        console.log(err);
    }

}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    try {
        const post = await postMessage.findById(id);
    
        post.comments.push(value);
    
        const updatedPost = await postMessage.findByIdAndUpdate(id, post, {new: true});
    
        res.json(updatedPost);
    } catch(err) {
        console.log(err);
    }
}

export const deleteComment = async (req, res) => {
    const {id, commentId} = req.params;

    try {
        if(!req.userId) return res.json({ message: "Unauthenticated" });
    
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that ID");
    
        const post = await postMessage.findById(id);
    
        const postComments = post.comments.filter((comment) => {
            return comment.commentId !== commentId;
        })

        const updatedPost = await postMessage.findByIdAndUpdate(id, {comments: postComments}, {new: true} );
        res.json(updatedPost._doc);
    } catch (err) {
        console.log(err);
    }
}

export const editComment = async (req, res) => {
    const { commentId, text } = req.body.value; 
    const { id } = req.params;

    try {
        if(!req.userId) return res.json({ message: "Unauthenticated" });

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that ID");

        const post = await postMessage.findById(id);

        const postComments = post.comments.map((comment) => {
            if(comment.commentId === commentId) {
                comment.text = text
            }
            return comment;
        })

        const updatedPost = await postMessage.findByIdAndUpdate(id, {comments: postComments}, {new: true})
        
        res.json(updatedPost);
    } catch(err) {
        console.log(err);
    }
}