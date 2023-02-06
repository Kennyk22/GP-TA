"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const AssignmentTitleControllers_1 = __importDefault(require("../Controllers/AssignmentTitleControllers"));
const AssignmentControllers_1 = __importDefault(require("../Controllers/AssignmentControllers"));
const StudentsController_1 = __importDefault(require("../Controllers/StudentsController"));
const getAllTest_1 = __importDefault(require("../Controllers/getAllTest"));
const router = new koa_router_1.default();
//Requests to AI for feedback
router.post('/addFeedback', AssignmentControllers_1.default.aiPost);
router.get('/getFeedback/:titleId/:studentId', AssignmentControllers_1.default.getAssignment);
//Requests to DB for students info
router.get('/student/:id', StudentsController_1.default.getStudentInfo);
router.get('/student', StudentsController_1.default.getAllStudents);
router.post('/addStudent', StudentsController_1.default.addStudent);
router.delete('/student/:id', StudentsController_1.default.deleteOne);
//Requests to DB for assignments info
router.get('/assignment/:id', AssignmentTitleControllers_1.default.getAssignmentInfo);
router.get('/assignment', AssignmentTitleControllers_1.default.getAllAssignmentTitles);
router.post('/addAssignment', AssignmentTitleControllers_1.default.addTitle);
router.delete('/assignment/:id', AssignmentTitleControllers_1.default.deleteOneTitle);
router.get('/allstudentandassignments', getAllTest_1.default.getAllStudentsAndAssignments);
exports.default = router;
