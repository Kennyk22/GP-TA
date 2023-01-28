import Router from 'koa-router'
import AssignmentController from '../Controllers/AssignmentControllers'

const router = new Router()

router.post('/user', AssignmentController.userAdd)
router.post('/addFeedback', AssignmentController.aiPost)



export default router