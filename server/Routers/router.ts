
import Router from 'koa-router'
import { Context } from 'koa'
import { resolve } from 'path';
require("dotenv").config()

const serve = require('koa-static')


const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const router = new Router()

router.use(serve(process.env.STATIC_DIR));

router.get("/", (ctx) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  ctx.body = path;
});

router.get("/config", (ctx) => {
  ctx.body = {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  }

});


router.post("/create-payment-intent", async (ctx) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });
    // Send publishable key and PaymentIntent details to client
    ctx.body = ({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (e) {
      ctx.status = 400
      ctx.body = e
  }
});
export default router