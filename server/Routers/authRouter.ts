import Router from 'koa-router'
import testControllers from '../Controllers/testControllers'

const router = new Router()


router.get('/testAuth', testControllers.testAuth)

export default router