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
        var _a, _b, _c;
        try {
            //creates config and calls ai to make feedback
            const body = ctx.request.body;
            const content = body.content;
            const studentId = body.studentId;
            const titleId = body.titleId;
            const configuration = new openai_1.Configuration({
                apiKey: process.env.API_KEY,
            });
            const openai = new openai_1.OpenAIApi(configuration);
            //FIRST AI CALL
            const aiResponse1 = yield openai.createChatCompletion((0, Helpers_1.aiProp)("return the same text and wrap only grammar or spelling mistakes in asterisks" + content));
            const feedback1 = JSON.stringify((_a = aiResponse1.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content);
            // SECOND AI CALL
            const aiResponse2 = yield openai.createChatCompletion((0, Helpers_1.aiProp)("provide a numbered list of grammatical errors in this text with a short explanation and its correction" + content));
            const feedback2 = JSON.stringify((_b = aiResponse2.data.choices[0].message) === null || _b === void 0 ? void 0 : _b.content);
            //THIRD AI CALL
            const aiResponse3 = yield openai.createChatCompletion((0, Helpers_1.aiProp)("tell me 5 general things I could do to improve this text with short examples from the text and explain like you are a teacher:" + content));
            const feedback3 = JSON.stringify((_c = aiResponse3.data.choices[0].message) === null || _c === void 0 ? void 0 : _c.content);
            //COMBINES AI CALLS WITH WITH REMOVABLE ELEMENT INBETWEEN
            const feedback = feedback1 + "-+-" + feedback2 + "-+-" + feedback3;
            //calls auth0 for usertoken and extracts email
            const userEmail = yield (0, Helpers_1.getAuth0Email)(ctx);
            const updateCheck = yield Assignment_1.Assignment.findOne({ where: { ownerId: JSON.stringify(userEmail), titleId: titleId, studentId: studentId } });
            if (!updateCheck) {
                const response = yield Assignment_1.Assignment.create({ ownerId: JSON.stringify(userEmail), text: JSON.stringify(content), response: feedback, titleId: titleId, studentId: studentId });
                ctx.body = { text: response.dataValues.response };
            }
            else {
                const response = yield Assignment_1.Assignment.update({ text: JSON.stringify(content), response: feedback }, { where: { ownerId: JSON.stringify(userEmail), titleId: titleId, studentId: studentId }, returning: true });
                ctx.body = { text: response[1][0].dataValues.response };
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getAssignment: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = ctx.params;
            const userEmail = yield (0, Helpers_1.getAuth0Email)(ctx);
            const studentId = parseInt(body.studentId);
            const titleId = parseInt(body.titleId);
            const response = yield Assignment_1.Assignment.findOne({ where: { studentId: studentId, ownerId: JSON.stringify(userEmail), titleId: titleId } });
            ctx.status = 200;
            ctx.body = response ? { text: response.dataValues.response } : { text: null };
        }
        catch (error) {
            ctx.status = 500;
            console.log(error);
        }
    })
};
