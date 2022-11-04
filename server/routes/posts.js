import express from 'express';
import { getPosts, getPost, createPost, updatePost, deletePost, likePost, commentPost, deleteComment, getPostsBySearch, editComment } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.patch('/:id/commentPost/:commentId', auth, deleteComment);
router.get('/:id', getPost);
router.patch('/:id/commentPost', auth, editComment)
router.post('/:id/commentPost', auth, commentPost);
router.patch('/:id/likePost', auth, likePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id', auth, updatePost);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.post('/', auth, createPost);



export default router;