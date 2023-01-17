import  {createPost,updatePost,deletePost,getPost , getAllPost,getUserAllPosts,getTimelinePosts,likeDislikePost} from '../controllers/postController.js'
import express  from 'express'

const router = express.Router();

router.route('/').post(createPost).get(getAllPost)
router.route('/:id').put(updatePost).delete(deletePost).get(getPost)
router.route('/profile/:userName').get(getUserAllPosts)
router.route('/timeline/:userId').get(getTimelinePosts)
router.route('/:id/like').put(likeDislikePost)

export default router;