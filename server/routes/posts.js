import express from 'express';
import { getPosts, getPost, createPost, updatePost, deletePost, likePost, commentPost, getPostsBySearch } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/:id/commentPost', auth, commentPost)
router.patch('/:id/likePost', auth, likePost);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.get('/', getPosts);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/', auth, createPost);



export default router;