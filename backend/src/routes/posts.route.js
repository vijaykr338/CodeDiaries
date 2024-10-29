import { Router } from 'express';
import { createPost, getPosts, getPostById } from '../controllers/posts.controller.js';

const postsRouter = Router();

postsRouter.post('/create-post', createPost);
postsRouter.get('/getposts', getPosts);
postsRouter.get('/getpost/:id', getPostById);


export default postsRouter;