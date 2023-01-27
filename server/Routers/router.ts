
import Router from 'koa-router'
import testControllers from '../Controllers/testControllers'

const router = new Router()


router.get('/test', testControllers.test)

export default router