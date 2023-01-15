import  {createPost,updatePost,deletePost,getPost , getAllPost,getUserAllPosts,} from '../controllers/postController.js'
import express  from 'express'

const router = express.Router();

router.route('/').post(createPost).get(getAllPost)
router.route('/:id').put(updatePost).delete(deletePost).get(getPost)
router.route('/profile/:username').get(getUserAllPosts)

export default router;