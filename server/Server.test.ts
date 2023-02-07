import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import authRouter from './Routers/authRouter'
import supertest from 'supertest'
import { Student } from './Models/Student'
import sequelize from 'sequelize'
import * as dotenv from "dotenv";
import { Sequelize, Dialect } from "sequelize";
import { afterEach, beforeEach, describe } from 'node:test'
import { AssignmentTitle } from './Models/AssignmentTitles'
// import request from 'supertest'

dotenv.config();
const app = new Koa()
app.use(bodyParser())
app.use(authRouter.routes())

describe('Student API', ()=> {
    const server = app.listen()
    
    const request = supertest(server)
    beforeEach(async () => {

        await Student.sync({ force: true })
    });
    afterEach ( async ()=> {
        await Student.drop()
    });
    describe("Post Student", ()=> {
        it("posting a student returns class", async ()=> {
            const response = await request.post('/addStudent').send({name: 'test'})
            expect(response.statusCode).toBe(201)
        })
    })
    describe("get Student", () => {
        it("gets a student returns class", async () => {
            const response = await request.post('/addStudent').send({ id: 1, name: 'test' })
    
            const user = await request.get('/student/1')

            expect(user?.body.name).toEqual('test')
        })
    })
})

describe('Assignment Title API', ()=> {
    const server = app.listen()
    
    const request = supertest(server)
    beforeEach(async () => {

        await AssignmentTitle.sync({ force: true })
    });
    afterEach ( async ()=> {
        await AssignmentTitle.drop()
    });
    describe("Post Student", ()=> {
        it("posting a student returns class", async ()=> {
            const response = await request.post('/addAssignment').send({title: 'test'})
            expect(response.statusCode).toBe(201)
        })
    })
    describe("add assignment", () => {
        it("add assignment returns class", async () => {
            const response = await request.post('/addAssignment').send({ id: 1, title: 'test' })
    
            const user = await request.get('/assignment/1')

            expect(user?.body.title).toEqual('test')
        })
    })
})

