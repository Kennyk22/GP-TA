"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const AssignmentControllers_1 = __importDefault(require("../Controllers/AssignmentControllers"));
const router = new koa_router_1.default();
router.post('/user', AssignmentControllers_1.default.userAdd);
router.post('/addFeedback', AssignmentControllers_1.default.aiPost);
exports.default = router;
