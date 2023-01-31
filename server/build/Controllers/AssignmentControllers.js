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
const Helpers_1 = require("../Middleware/Helpers");
dotenv_1.default.config();
exports.default = {
    aiPost: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //creates config and calls ai to make feedback
            const body = ctx.request.body;
            const content = body.content;
            const configuration = new openai_1.Configuration({
                apiKey: process.env.API_KEY,
            });
            const openai = new openai_1.OpenAIApi(configuration);
            //FIRST AI CALL
            const aiResponse1 = yield openai.createCompletion((0, Helpers_1.aiProp)("wrap grammatical errors in this text with astrisks:" + content));
            const feedback1 = JSON.stringify(aiResponse1.data.choices[0].text);
            // SECOND AI CALL
            const aiResponse2 = yield openai.createCompletion((0, Helpers_1.aiProp)("provide a numbered list of grammatical errors in this text with a short explanation:" + content));
            const feedback2 = JSON.stringify(aiResponse2.data.choices[0].text);
            //COMBINES AI CALLS WITH WITH REMOVABLE ELEMENT INBETWEEN
            // const feedback = feedback1
            const feedback = feedback1 + "-+-" + feedback2;
            //calls auth0 for usertoken and extracts email
            const userEmail = (0, Helpers_1.getAuth0Email)(ctx);
            const response = yield Assignment_1.Assignment.create({ ownerId: JSON.stringify('userEmail'), text: JSON.stringify(content), response: feedback });
            ctx.body = { text: response.dataValues.response };
        }
        catch (error) {
            console.log(error);
        }
    }),
    userAdd: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    })
};
