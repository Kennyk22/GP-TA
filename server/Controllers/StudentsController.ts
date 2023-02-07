import { Context } from "koa";
import { OpenAIApi, Configuration } from "openai";
import dotenv from 'dotenv';
import { Student } from "../Models/Student";
import { getAuth0Email} from "../Middleware/Helpers";
import { response } from "express";
import { FindOptions } from "sequelize";
dotenv.config()

export default {

  getStudentInfo: async (ctx: Context) => {
    try {
      const StudentId = ctx.params as {id: string}
      const studentProfile = await Student.findOne({where: StudentId})
      ctx.body = studentProfile
      ctx.status = 200
    } catch (error) {
      console.log(error)
    }
  },

  addStudent: async (ctx: Context) => {
    try {
      const body: any = ctx.request.body as {name:string}
      const content = body.name
      let ownerId
      try {
        ownerId = await getAuth0Email(ctx)
      } catch {
        ownerId='test'
      }
      await Student.create({ ownerId: ownerId, name: content })
      ctx.body = await Student.findAll({where: {ownerId: ownerId}})
      ctx.status = 201
    } catch (error) {
      console.log(error)
      ctx.status = 500
    }
  },

  deleteOne: async (ctx: Context) => {
    try {
    const StudentName = ctx.params as { id: string }
    const ownerId = await getAuth0Email(ctx)
      await Student.destroy({where: {id: StudentName.id}})
      ctx.body = await Student.findAll({where: {ownerId: ownerId}})
    } catch (error) {
      console.log(error)
    }
  }













}