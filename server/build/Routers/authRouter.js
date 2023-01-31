"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const AssignmentControllers_1 = __importDefault(require("../Controllers/AssignmentControllers"));
const StudentsController_1 = __importDefault(require("../Controllers/StudentsController"));
const router = new koa_router_1.default();
//Requests to AI for feedback
router.post('/user', AssignmentControllers_1.default.userAdd);
router.post('/addFeedback', AssignmentControllers_1.default.aiPost);
//Requests to DB for students info
router.get('/student/:id', StudentsController_1.default.getStudentInfo);
router.get('/student', StudentsController_1.default.getAllStudents);
router.post('/addStudent', StudentsController_1.default.addStudent);
router.delete('/student/:id', StudentsController_1.default.deleteOne);
exports.default = router;
