import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
// import router from './router'
// import authRouter from './authRouter'


export const bootServer = (port: number): Koa<Koa.DefaultState, Koa.DefaultContext> => {
    const app = new Koa()
    
    app.use(cors())
    app.use(bodyParser())

    // app.use(router.routes())

    // app.use(authRouter.routes())

    app.listen(port, ()=>{
        console.log(`server is running on port: ${port}`)
    })

    return app
}