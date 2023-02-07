"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const authRouter_1 = __importDefault(require("./Routers/authRouter"));
const supertest_1 = __importDefault(require("supertest"));
const Student_1 = require("./Models/Student");
const dotenv = __importStar(require("dotenv"));
const node_test_1 = require("node:test");
const AssignmentTitles_1 = require("./Models/AssignmentTitles");
// import request from 'supertest'
dotenv.config();
const app = new koa_1.default();
app.use((0, koa_bodyparser_1.default)());
app.use(authRouter_1.default.routes());
(0, node_test_1.describe)('Student API', () => {
    const server = app.listen();
    const request = (0, supertest_1.default)(server);
    (0, node_test_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Student_1.Student.sync({ force: true });
    }));
    (0, node_test_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Student_1.Student.drop();
    }));
    (0, node_test_1.describe)("Post Student", () => {
        it("posting a student returns class", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/addStudent').send({ name: 'test' });
            expect(response.statusCode).toBe(201);
        }));
    });
    (0, node_test_1.describe)("get Student", () => {
        it("gets a student returns class", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/addStudent').send({ id: 1, name: 'test' });
            const user = yield request.get('/student/1');
            expect(user === null || user === void 0 ? void 0 : user.body.name).toEqual('test');
        }));
    });
});
(0, node_test_1.describe)('Assignment Title API', () => {
    const server = app.listen();
    const request = (0, supertest_1.default)(server);
    (0, node_test_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield AssignmentTitles_1.AssignmentTitle.sync({ force: true });
    }));
    (0, node_test_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield AssignmentTitles_1.AssignmentTitle.drop();
    }));
    (0, node_test_1.describe)("Post Student", () => {
        it("posting a student returns class", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/addAssignment').send({ title: 'test' });
            expect(response.statusCode).toBe(201);
        }));
    });
    (0, node_test_1.describe)("add assignment", () => {
        it("add assignment returns class", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/addAssignment').send({ id: 1, title: 'test' });
            const user = yield request.get('/assignment/1');
            expect(user === null || user === void 0 ? void 0 : user.body.title).toEqual('test');
        }));
    });
});
