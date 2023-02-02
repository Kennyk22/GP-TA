import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import router from './Routers/router'
import authRouter from './Routers/authRouter'
import { verifyJwt } from './Middleware/authMiddleWare'
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


export const bootServer = (port: number): Koa<Koa.DefaultState, Koa.DefaultContext> => {
    const app = new Koa()
    app.use(cors())
    app.use(bodyParser())
    //these routes do not have access to authorized routes
    app.use(router.routes())
    //from this point, routes called after verifyJwt will have authorization
    app.use(verifyJwt)
    //these routes must be authorized
    app.use(authRouter.routes())
    app.listen(port, ()=>{
        console.log(`server is running on port: ${port}`)
    })

    return app
}