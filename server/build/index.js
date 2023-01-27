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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Assignment_1 = require("./Models/Assignment");
const server_1 = require("./server");
dotenv_1.default.config();
const PORT = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3005');
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('syncing...');
        yield Assignment_1.Assignment.sync();
        console.log("connected to db:", process.env.DB_NAME);
        (0, server_1.bootServer)(PORT);
    }
    catch (e) {
        console.log("error in sevrer", e);
    }
}))();
