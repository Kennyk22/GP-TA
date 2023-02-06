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
const dotenv_1 = __importDefault(require("dotenv"));
const AssignmentTitles_1 = require("../Models/AssignmentTitles");
const Helpers_1 = require("../Middleware/Helpers");
dotenv_1.default.config();
exports.default = {
    getAssignmentInfo: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const titleId = ctx.params;
            const title = yield AssignmentTitles_1.AssignmentTitle.findOne({ where: { id: titleId } });
            ctx.status = 200;
            ctx.body = title;
        }
        catch (error) {
            ctx.status = 500;
            console.log(error);
        }
    }),
    addTitle: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = ctx.request.body;
            const title = body.title;
            const ownerId = yield (0, Helpers_1.getAuth0Email)(ctx);
            yield AssignmentTitles_1.AssignmentTitle.create({ ownerId: JSON.stringify(ownerId), title: title });
            ctx.status = 201;
            ctx.body = yield AssignmentTitles_1.AssignmentTitle.findAll({ where: { ownerId: JSON.stringify(ownerId) } });
        }
        catch (error) {
            ctx.status = 500;
            console.log(error);
        }
    }),
    deleteOneTitle: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const titleId = ctx.params;
            const ownerId = yield (0, Helpers_1.getAuth0Email)(ctx);
            console.log(ownerId);
            const title = yield AssignmentTitles_1.AssignmentTitle.destroy({ where: { id: parseInt(titleId.id) } });
            ctx.status = 201;
            ctx.body = yield AssignmentTitles_1.AssignmentTitle.findAll({ where: { ownerId: JSON.stringify(ownerId) } });
        }
        catch (error) {
            ctx.status = 500;
            console.log(error);
        }
    })
};
