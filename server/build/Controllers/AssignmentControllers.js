"use strict";
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
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
const Assignment_1 = require("../Models/Assignment");
dotenv_1.default.config();
exports.default = {
    aiPost: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('loading', ctx.request.body);
            //creates config and calls ai to make feedback
            const body = ctx.request.body;
            const content = body.content;
            console.log("this is the teacher input", content);
            const configuration = new openai_1.Configuration({
                apiKey: process.env.API_KEY,
            });
            const openai = new openai_1.OpenAIApi(configuration);
            const aiResponse = yield openai.createCompletion({
                model: "text-davinci-003",
                prompt: "Correct this to standard English:" + content,
                temperature: 0,
                max_tokens: 60,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });
            const feedback = JSON.stringify(aiResponse.data.choices[0].text);
            console.log("this is the feedback from openai", feedback);
            // calls auth0 for usertoken and extracts email
            // const accessToken = await ctx.get('authorization').split(' ')[1]
            // const authResponse = await fetch('https://dev-nuxp1yqmbgbv4efn.us.auth0.com/userinfo', {
            //     headers: {
            //         authorization: `Bearer ${accessToken}`
            //     }
            // });
            // const userInfo:any = await authResponse.json()
            // const userId = userInfo.email
            // console.log("userid or email ===", userId)
            const response = yield Assignment_1.Assignment.create({ ownerId: JSON.stringify('userId'), text: JSON.stringify(ctx.request.body), response: feedback });
            console.log(response);
            ctx.body = response.dataValues.response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    userAdd: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    })
};
