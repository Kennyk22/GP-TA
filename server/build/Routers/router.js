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
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const router = new koa_router_1.default();
//stripe payments
const storeItems = new Map([
    ['basic', { price: 5, name: 'basic plan' }],
    ['pro', { price: 38, name: 'pro plan' }]
]);
router.post("/create-checkout-session", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(ctx.body);
        console.log('it works');
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: ctx.request.body.items.map(item => {
                const storeItem = storeItems.get(item.id);
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: storeItem.name,
                        },
                        unit_amount: storeItem.priceInCents,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        });
        ctx.body({ url: session.url });
    }
    catch (e) {
        ctx.status = 500;
    }
}));
exports.default = router;
