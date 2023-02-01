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
      const StudentId = ctx.params as {content: string}
      const studentProfile = await Student.findOne({where: {id: StudentId}})
      ctx.body = studentProfile
    } catch (error) {
      console.log(error)
    }
  },

  getAllStudents: async (ctx: Context) => {
    try {
      const ownerId = await getAuth0Email(ctx)
      const allStudents = await Student.findAll({where: {ownerId : ownerId}})
      ctx.body = allStudents
    } catch (error) {
      console.log(error)
    }
  },

  addStudent: async (ctx: Context) => {
    try {
      const body: any = ctx.request.body as {name:string}
      const content = body.name
      const ownerId = await getAuth0Email(ctx)
       await Student.create({ ownerId: ownerId, name: content })
      ctx.body = await Student.findAll({where: {ownerId: ownerId}})
      ctx.status = 200
    } catch (error) {
      console.log(error)
    }
  },

  deleteOne: async (ctx: Context) => {
  try {
    const StudentId = ctx.params as { content: string }
    const ownerId = await getAuth0Email(ctx)
      await Student.destroy({where: {id: StudentId}})
      ctx.body = await Student.findAll({where: {ownerId: ownerId}})
    } catch (error) {
      console.log(error)
    }
  }













}