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
Object.defineProperty(exports, "__esModule", { value: true });
const AssignmentTitles_1 = require("../Models/AssignmentTitles");
const Helpers_1 = require("../Middleware/Helpers");
const Student_1 = require("../Models/Student");
exports.default = {
    getAllStudentsAndAssignments: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ownerId = yield (0, Helpers_1.getAuth0Email)(ctx);
            const allTitles = yield AssignmentTitles_1.AssignmentTitle.findAll({ where: { ownerId: JSON.stringify(ownerId) } });
            const allStudents = yield Student_1.Student.findAll({ where: { ownerId: ownerId } });
            ctx.body = { titles: allTitles, students: allStudents };
            ctx.status = 200;
        }
        catch (error) {
            ctx.status = 500;
            console.log(error);
        }
    })
};
