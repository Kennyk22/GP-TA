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
const koa_router_1 = __importDefault(require("koa-router"));
require("dotenv").config();
const serve = require('koa-static');
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const router = new koa_router_1.default();
router.use(serve(process.env.STATIC_DIR));
router.get("/", (ctx) => {
    const path = resolve(process.env.STATIC_DIR + "/index.html");
    ctx.body = path;
});
router.get("/config", (ctx) => {
    ctx.body = {
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    };
});
router.post("/create-payment-intent", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentIntent = yield stripe.paymentIntents.create({
            currency: "EUR",
            amount: 1999,
            automatic_payment_methods: { enabled: true },
        });
        // Send publishable key and PaymentIntent details to client
        ctx.body = ({
            clientSecret: paymentIntent.client_secret,
        });
    }
    catch (e) {
        ctx.status = 400;
        ctx.body = e;
    }
}));
exports.default = router;
