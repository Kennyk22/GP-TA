import Router from 'koa-router'
import AssignmentTitleControllers from '../Controllers/AssignmentTitleControllers'
import AssignmentControllers from '../Controllers/AssignmentControllers'
import StudentsController from '../Controllers/StudentsController'

const router = new Router()

//Requests to AI for feedback
router.post('/addFeedback', AssignmentControllers.aiPost)
router.get('/getFeedback/:titleId/:studentId', AssignmentControllers.getAssignment)

//Requests to DB for students info


router.get('/student/:id', StudentsController.getStudentInfo)
router.get('/student', StudentsController.getAllStudents)
router.post('/addStudent', StudentsController.addStudent)
router.delete('/student/:id', StudentsController.deleteOne)


//Requests to DB for assignments info

router.get('/assignment/:id', AssignmentTitleControllers.getAssignmentInfo)
router.get('/assignment', AssignmentTitleControllers.getAllAssignmentTitles)
router.post('/addAssignment', AssignmentTitleControllers.addTitle);
router.delete('/assignment/:id', AssignmentTitleControllers.deleteOneTitle)

export default router