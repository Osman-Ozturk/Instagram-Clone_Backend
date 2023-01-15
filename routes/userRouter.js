import express from 'express'
import { updateUser ,deleteUser ,getUser,getAllUsers} from '../controllers/userController.js'

const router = express.Router()

router.route('/:id').put(updateUser).delete(deleteUser)
router.route('/:name').get(getUser)
router.route('/').get(getAllUsers)


export default router;