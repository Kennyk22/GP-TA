"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const koa_jwt_1 = __importDefault(require("koa-jwt"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
exports.verifyJwt = (0, koa_jwt_1.default)({
    secret: jwks_rsa_1.default.koaJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-nuxp1yqmbgbv4efn.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'gpt-tapi.com',
    issuer: 'https://dev-nuxp1yqmbgbv4efn.us.auth0.com/',
    algorithms: ['RS256']
});
