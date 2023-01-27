"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootServer = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_cors_1 = __importDefault(require("koa-cors"));
// import router from './router'
// import authRouter from './authRouter'
const bootServer = (port) => {
    const app = new koa_1.default();
    app.use((0, koa_cors_1.default)());
    app.use((0, koa_bodyparser_1.default)());
    // app.use(router.routes())
    // app.use(authRouter.routes())
    app.listen(port, () => {
        console.log(`server is running on port: ${port}`);
    });
    return app;
};
exports.bootServer = bootServer;
