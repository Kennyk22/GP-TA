import dotenv from 'dotenv'
import { Context } from 'koa'


dotenv.config()

//creates prompt for ai
export const aiProp =  (string:string) => {
    return {
       model: "gpt-3.5-turbo",
        messages: [{
            role: 'user',
            content: string
        }],
        temperature: 0,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    }
}
//gets email from auth0 token
export const getAuth0Email = async (ctx: Context) => {
    const accessToken = await ctx.get('authorization').split(' ')[1]
    const authResponse = await fetch('https://dev-nuxp1yqmbgbv4efn.us.auth0.com/userinfo', {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    });
    const userInfo:any = await authResponse.json()
    return userInfo.email
}