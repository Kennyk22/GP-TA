import { Context } from "koa";
import { OpenAIApi, Configuration } from "openai";
import dotenv from 'dotenv';
import { Assignment } from "../Models/Assignment";
import {aiProp, getAuth0Email} from "../Middleware/Helpers";
import { Student } from "../Models/Student";
import { Console } from "console";
dotenv.config()

export default {
    aiPost: async (ctx: Context) => {
        try {
            //creates config and calls ai to make feedback
            const body = ctx.request.body as {content: string, studentId: number, titleId: number}
            const content = body.content
            const studentId = body.studentId
            const titleId = body.titleId

            const configuration = new Configuration({
                apiKey: process.env.API_KEY,
            });
            const openai = new OpenAIApi(configuration)
            const feedback1: string[] = []

            const feedback2: string[] = []
            const splitprompt = content.split('.')

            for (let i=0; i < splitprompt.length-1; i++) {
            //FIRST AI CALL
            const aiResponse1 = await openai.createCompletion(aiProp("wrap grammatical errors in this text with astrisks:" + splitprompt[i]));
            feedback1.push(JSON.stringify(aiResponse1.data.choices[0].text))

            // SECOND AI CALL
            const aiResponse2 = await openai.createCompletion(aiProp("provide a numbered list of grammatical errors in this text with a short explanation:" + splitprompt[i],));
            feedback2.push(JSON.stringify(aiResponse2.data.choices[0].text))
            }
            //THIRD AI CALL
            const aiResponse3 = await openai.createCompletion(aiProp("Based on this text" + content + "can you tell me specific things I could do to improve my Spanish mentioning 5 of the mistakes. Answer this as if you were the teacher writing a feedback conclusion for an essay"))
             const feedback3 = (JSON.stringify(aiResponse3.data.choices[0].text))
            //COMBINES AI CALLS WITH WITH REMOVABLE ELEMENT INBETWEEN
            const feedback = feedback1.join(" ") + "-+-" + feedback2.join(" ") + "-+-" + feedback3
            console.log(feedback)
            //calls auth0 for usertoken and extracts email
            const userEmail = await getAuth0Email(ctx)

            const response = await Assignment.create({ownerId: JSON.stringify(userEmail), text: JSON.stringify(content), response: feedback, titleId: titleId, studentId:studentId})

            ctx.body = {text : response.dataValues.response}
        } catch (error) {
            console.log(error)
        }
    },
    getAssignment: async (ctx: Context) => {
        try {
            const body = ctx.params as {studentId: string, titleId:string}
            const userEmail = await getAuth0Email(ctx) as string
            const studentId = parseInt(body.studentId)
            const titleId = parseInt(body.titleId)
            console.log(studentId, titleId, userEmail)
            const response = await Assignment.findOne({where: {studentId: studentId, ownerId:JSON.stringify(userEmail), titleId:titleId}})
            console.log(response)
            ctx.status = 200
            ctx.body = response ? {text : response.dataValues.response} : {text: null}
        } catch (error) {
            ctx.status = 500
            console.log(error)
        }

    }
}