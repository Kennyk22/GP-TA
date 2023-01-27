import { Context } from "koa"


export default {

    test: async (ctx: Context) => {
        try {
            ctx.body = {msg: 'this is an unautherized path'}
            ctx.status = 200
        } catch (error) {
            ctx.status = 500
        }
    },

    testAuth: async (ctx: Context) => {
      try {        
            ctx.body = { msg: 'this is an authorized path' }
            ctx.status = 200
        } catch (error) {
            ctx.status = 500
        }
    }
    
}
