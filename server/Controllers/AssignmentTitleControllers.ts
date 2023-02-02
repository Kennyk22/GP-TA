import { Context } from "koa";
import dotenv from 'dotenv';
import { AssignmentTitle } from "../Models/AssignmentTitles";
import { getAuth0Email} from "../Middleware/Helpers";

dotenv.config()

export default {

  getAssignmentInfo: async (ctx: Context) => {
    try {
      const titleId = ctx.params as {content: string}
      const title = await AssignmentTitle.findOne({where: {id: titleId}})
      ctx.status = 200
      ctx.body = title
    } catch (error) {
      ctx.status = 500
      console.log(error)
    }
  },

  getAllAssignmentTitles: async (ctx: Context) => {
    try {
      const ownerId = await getAuth0Email(ctx)
      const allTitles = await AssignmentTitle.findAll({where: {ownerId : ownerId}})
      ctx.body = allTitles
      ctx.status = 200
    } catch (error) {
      ctx.status = 500
      console.log(error)
    }
  },

  addTitle: async (ctx: Context) => {
    try {
      const body = ctx.request.body as { title: string }
      const title: string = body.title
      const ownerId = await getAuth0Email(ctx)
      await AssignmentTitle.create({ownerId: ownerId, title: title})
      ctx.status = 201
      ctx.body = await AssignmentTitle.findAll({ where: { ownerId: ownerId } })
    } catch (error) {
      ctx.status = 500
      console.log(error)
    }
  },

  deleteOneTitle: async (ctx: Context) => {
  try {
      const titleId = ctx.params as {content: string}
      const title = await AssignmentTitle.destroy({where: {id: titleId}})
      ctx.status = 201
      ctx.body = title
    } catch (error) {
      ctx.status = 500
      console.log(error)
    }
  }
}