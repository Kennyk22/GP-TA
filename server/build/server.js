"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootServer = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_cors_1 = __importDefault(require("koa-cors"));
const router_1 = __importDefault(require("./Routers/router"));
const authRouter_1 = __importDefault(require("./Routers/authRouter"));
const authMiddleWare_1 = require("./Middleware/authMiddleWare");
const bootServer = (port) => {
    const app = new koa_1.default();
    app.use((0, koa_cors_1.default)());
    app.use((0, koa_bodyparser_1.default)());
    //these routes do not have access to authorized routes
    app.use(router_1.default.routes());
    //from this point, routes called after verifyJwt will have authorization
    app.use(authMiddleWare_1.verifyJwt);
    //these routes must be autherized
    app.use(authRouter_1.default.routes());
    app.listen(port, () => {
        console.log(`server is running on port: ${port}`);
    });
    return app;
};
exports.bootServer = bootServer;
