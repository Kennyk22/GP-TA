import { Context } from "koa";
import dotenv from 'dotenv';
import { AssignmentTitle } from "../Models/AssignmentTitles";
import { getAuth0Email} from "../Middleware/Helpers";

dotenv.config()

export default {

  getAssignmentInfo: async (ctx: Context) => {
    try {
      const titleId = ctx.params as {id: string}
      const title = await AssignmentTitle.findOne({where: titleId})
      ctx.status = 200
      ctx.body = title
    } catch (error) {
      ctx.status = 500
      console.log(error)
    }
  },

  addTitle: async (ctx: Context) => {
    try {
      const body = ctx.request.body as { title: string }
      const title: string = body.title
      let ownerId
      try {
        ownerId = await getAuth0Email(ctx)
      } catch {
        ownerId='test'
      }
      await AssignmentTitle.create({ownerId: JSON.stringify(ownerId), title: title})
      ctx.status = 201
      ctx.body = await AssignmentTitle.findAll({ where: { ownerId: JSON.stringify(ownerId) } })
    } catch (error) {
      ctx.status = 500
      console.log(error)
    }
  },

  deleteOneTitle: async (ctx: Context) => {
  try {
      const titleId = ctx.params as {id: string}
      const ownerId = await getAuth0Email(ctx)
      const title = await AssignmentTitle.destroy({where: {id: parseInt(titleId.id)}})
      ctx.status = 201
      ctx.body = await AssignmentTitle.findAll({where: {ownerId: JSON.stringify(ownerId)}})
    } catch (error) {
      ctx.status = 500
      console.log(error)
    }
  }
}