
import Router from 'koa-router'
import { Context } from 'vm'
require("dotenv").config()

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


const router = new Router()
//stripe payments
  const storeItems = new Map([
        ['basic', { price: 5, name: 'basic plan' }],
        ['pro', {price: 38, name: 'pro plan'}]
  ])

router.post("/create-checkout-session", async (ctx: Context) => {
  try {
    console.log(ctx.body)
    console.log('it works')
    const session:any = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: ctx.request.body.items.map(item => {
        const storeItem:any = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    })
    ctx.body({ url: session.url })
  } catch (e:any) {
    ctx.status = 500
  }
})

export default router