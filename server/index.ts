import dotenv from 'dotenv';
import { Assignment } from './Models/Assignment';
import { Student } from './Models/Student';
import { bootServer } from './server';
dotenv.config();

const PORT: number = parseInt(process.env.PORT ?? '3005');

(async () => {
    try {
        console.log('syncing...')
        await Assignment.sync();
        await Student.sync()
        console.log("connected to db:", process.env.DB_NAME);
        bootServer(PORT)
    } catch (e) {
        console.log("error in sevrer", e)
    }
})()


