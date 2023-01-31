import { Context } from "koa";
import { OpenAIApi, Configuration } from "openai";
import dotenv from 'dotenv';
import { Student } from "../Models/Student";
import { getAuth0Email} from "../Middleware/Helpers";
import { response } from "express";
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
      const ownerId = ctx.params
      const allStudents = await Student.findAll()
      ctx.body = allStudents
    } catch (error) {
      console.log(error)
    }
  },

  addStudent: async (ctx: Context) => {
    try {
      const body = ctx.request.body as { content: string }
      const ownerId = ctx.params
      const content = body.content
      // const {name:String, id:Number} = content
      const newStudent = await Student.create({ownerId: ownerId, name: 'name'})
    } catch (error) {
      console.log(error)
    }
  },

  deleteOne: async (ctx: Context) => {
  try {
      const StudentId = ctx.params as {content: string}
      const studentProfile = await Student.destroy({where: {id: StudentId}})
      ctx.body = studentProfile
    } catch (error) {
      console.log(error)
    }
  }













}