"use strict";
const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));


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
exports.getAuth0Email = exports.aiProp = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//creates prompt for ai
const aiProp = (string) => {
    return {
        model: "text-davinci-003",
        prompt: string,
        temperature: 0,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };
};
exports.aiProp = aiProp;
//gets email from auth0 token
const getAuth0Email = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield ctx.get('authorization').split(' ')[1];
    const authResponse = yield fetch('https://dev-nuxp1yqmbgbv4efn.us.auth0.com/userinfo', {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    });
    const userInfo = yield authResponse.json();
    return userInfo.email;
});
exports.getAuth0Email = getAuth0Email;
