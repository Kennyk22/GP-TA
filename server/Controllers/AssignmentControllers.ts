import { Context } from "koa";
import { OpenAIApi, Configuration } from "openai";
import dotenv from 'dotenv';
import { Assignment } from "../Models/Assignment";
import {aiProp, getAuth0Email} from "../Middleware/Helpers";
dotenv.config()

export default {
    aiPost: async (ctx: Context) => {
        try {
            //creates config and calls ai to make feedback
            const body = ctx.request.body as {content: string}
            const content = body.content

            const configuration = new Configuration({
                apiKey: process.env.API_KEY,
            });
            const openai = new OpenAIApi(configuration)

            //FIRST AI CALL
            const aiResponse1 = await openai.createCompletion(aiProp("surround grammatical errors in this text with astrisks but do not correct them:" + content));
            const feedback1 = JSON.stringify(aiResponse1.data.choices[0].text)

            // SECOND AI CALL
            const aiResponse2 = await openai.createCompletion(aiProp("provide a numbered list of grammatical errors in this text with a short explanation:" + content,));
            const feedback2 = JSON.stringify(aiResponse2.data.choices[0].text)

            //COMBINES AI CALLS WITH WITH REMOVABLE ELEMENT INBETWEEN
            // const feedback = feedback1
            const feedback = feedback1 + "-+-" +feedback2

            //calls auth0 for usertoken and extracts email
            // const userEmail = getAuth0Email(ctx)

            const response = await Assignment.create({ownerId: JSON.stringify('fakeEmailforTest'), text: JSON.stringify(content), response: feedback})
            ctx.body = {text : response.dataValues.response}
        } catch (error) {
            console.log(error)
        }
    },
    userAdd: async (ctx: Context) => {

    }
}