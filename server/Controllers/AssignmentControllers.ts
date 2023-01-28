import { Context } from "koa";
import { OpenAIApi, Configuration } from "openai";
import dotenv from 'dotenv';
import { userInfo } from "os";
import { Assignment } from "../Models/Assignment";
import fetch from 'node-fetch'
dotenv.config()

export default {
    aiPost: async (ctx: Context) => {
        try {
            console.log('loading', ctx.request.body)
            //creates config and calls ai to make feedback
            const body = ctx.request.body as {content: string}
            const content = body.content
            console.log("this is the teacher input", content)

            const configuration = new Configuration({
                apiKey: process.env.API_KEY,
            });
            const openai = new OpenAIApi(configuration)
            const aiResponse = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: "Correct this to standard English:" + content,
                temperature: 0,
                max_tokens: 60,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });
            const feedback = JSON.stringify(aiResponse.data.choices[0].text)
            console.log("this is the feedback from openai",feedback)

            // calls auth0 for usertoken and extracts email
            // const accessToken = await ctx.get('authorization').split(' ')[1]
            // const authResponse = await fetch('https://dev-nuxp1yqmbgbv4efn.us.auth0.com/userinfo', {
            //     headers: {
            //         authorization: `Bearer ${accessToken}`
            //     }
            // });
            // const userInfo:any = await authResponse.json()
            // const userId = userInfo.email
            // console.log("userid or email ===", userId)


            const response = await Assignment.create({ownerId: JSON.stringify('userId'), text: JSON.stringify(ctx.request.body), response: feedback})
            console.log(response)
            ctx.body = response.dataValues.response
        } catch (error) {
            console.log(error)
        }
    },
    userAdd: async (ctx: Context) => {

    }
}