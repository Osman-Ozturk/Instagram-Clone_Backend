import express from 'express'
import { updateUser ,deleteUser ,getUser,getAllUsers,addUser,loginUser,followUser,unfollowUser} from '../controllers/userController.js'
import { userValidator } from "../middleware/userValidator.js";
import  validateRequest  from "../middleware/validator.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router()

router.route('/:id').patch(updateUser).delete(auth,deleteUser)
router.route('/:userName').get(auth,getUser)
router.route('/').get(auth,admin,getAllUsers)
router.route('/').post(userValidator,validateRequest, addUser)
router.route('/login').post(loginUser)
router.route('/:id/follow').put(followUser)
router.route('/:id/unfollow').put(unfollowUser)

export default router;