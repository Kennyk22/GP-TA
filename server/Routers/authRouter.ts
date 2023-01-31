import Router from 'koa-router'
import AssignmentController from '../Controllers/AssignmentControllers'
import StudentsController from '../Controllers/StudentsController'

const router = new Router()

//Requests to AI for feedback
router.post('/user', AssignmentController.userAdd)
router.post('/addFeedback', AssignmentController.aiPost)


//Requests to DB for students info


router.get('/student/:id', StudentsController.getStudentInfo)
router.get('/student', StudentsController.getAllStudents)
router.post('/addStudent', StudentsController.addStudent)
router.delete('/student/:id', StudentsController.deleteOne)



export default router