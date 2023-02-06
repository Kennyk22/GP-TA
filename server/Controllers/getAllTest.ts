import { Context } from "koa";
import dotenv from 'dotenv';
import { AssignmentTitle } from "../Models/AssignmentTitles";
import { getAuth0Email} from "../Middleware/Helpers";
import { Student } from "../Models/Student";

export default {
    getAllStudentsAndAssignments: async (ctx: Context) => {
        try {
            const ownerId = await getAuth0Email(ctx)
            const allTitles = await AssignmentTitle.findAll({where: {ownerId : JSON.stringify(ownerId)}})
            const allStudents = await Student.findAll({where: {ownerId : ownerId}})
            ctx.body = {titles: allTitles, students: allStudents}
            ctx.status = 200
          } catch (error) {
            ctx.status = 500
            console.log(error)
          }

    }
}