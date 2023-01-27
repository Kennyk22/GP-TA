"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const testControllers_1 = __importDefault(require("../Controllers/testControllers"));
const router = new koa_router_1.default();
router.get('/test', testControllers_1.default.test);
exports.default = router;