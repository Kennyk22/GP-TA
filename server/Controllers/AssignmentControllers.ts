import { Context } from "koa";
import { OpenAIApi, Configuration, CreateChatCompletionRequest } from "openai";
import dotenv from 'dotenv';
import { Assignment } from "../Models/Assignment";
import { aiProp, getAuth0Email } from "../Middleware/Helpers";


dotenv.config()



export default {
    aiPost: async (ctx: Context) => {
        try {
            //creates config and calls ai to make feedback
            const body = ctx.request.body as { content: string, studentId: number, titleId: number }
            const content = body.content
            const studentId = body.studentId
            const titleId = body.titleId

            const configuration = new Configuration({
                apiKey: process.env.API_KEY,
            });
            const openai = new OpenAIApi(configuration)
            //FIRST AI CALL
            const aiResponse1 = await openai.createChatCompletion(aiProp("return the same text and wrap only grammar or spelling mistakes in asterisks" + content) as CreateChatCompletionRequest);
            const feedback1 = JSON.stringify(aiResponse1.data.choices[0].message?.content)

            // SECOND AI CALL
            const aiResponse2 = await openai.createChatCompletion(aiProp("provide a numbered list of grammatical errors in this text with a short explanation and its correction" + content) as CreateChatCompletionRequest);
            const feedback2 = JSON.stringify(aiResponse2.data.choices[0].message?.content)

            //THIRD AI CALL
            const aiResponse3 = await openai.createChatCompletion(aiProp("tell me 5 general things I could do to improve this text with short examples from the text and explain like you are a teacher:" + content) as CreateChatCompletionRequest)
            const feedback3 = JSON.stringify(aiResponse3.data.choices[0].message?.content)

            //COMBINES AI CALLS WITH WITH REMOVABLE ELEMENT INBETWEEN
            const feedback = feedback1 + "-+-" + feedback2 + "-+-" + feedback3
            //calls auth0 for usertoken and extracts email
            const userEmail = await getAuth0Email(ctx)
            const updateCheck = await Assignment.findOne({where: { ownerId: JSON.stringify(userEmail), titleId: titleId, studentId: studentId }})
            if (!updateCheck) {
                const response = await Assignment.create({ ownerId: JSON.stringify(userEmail), text: JSON.stringify(content), response: feedback, titleId: titleId, studentId: studentId })
                ctx.body = { text: response.dataValues.response }
            } else {
                const response = await Assignment.update({text: JSON.stringify(content), response: feedback}, {where: { ownerId: JSON.stringify(userEmail), titleId: titleId, studentId: studentId }, returning:true})
                ctx.body = { text: response[1][0].dataValues.response}
            }

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
            const response = await Assignment.findOne({where: {studentId: studentId, ownerId:JSON.stringify(userEmail), titleId:titleId}})
            ctx.status = 200
            ctx.body = response ? {text : response.dataValues.response} : {text: null}
        } catch (error) {
            ctx.status = 500
            console.log(error)
        }

    }
}