import dotenv from 'dotenv';
import { Assignment } from './Models/Assignment';
import { bootServer } from './server';
dotenv.config();

const PORT: number = parseInt(process.env.PORT ?? '3005');

(async () => {
    try {
        console.log('syncing...')
        await Assignment.sync();
        console.log("connected to db:", process.env.DB_NAME);
        bootServer(PORT)
    } catch (e) {
        console.log("error in sevrer", e)
    }
})()


