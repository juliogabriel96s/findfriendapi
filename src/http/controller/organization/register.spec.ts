import { expect, describe, beforeAll, afterAll, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";

describe('E2E register', () =>{
    beforeAll(async() =>{
        await app.ready()
    })

    afterAll(async() =>{
        await app.close()
    })

    it('Should be able register a organization', async() =>{
        const response = await request(app.server).post('/register').send({
            name: 'John doe org',
            email: 'johndoe@example.com', 
            password: 'gabriel12345',
            city: 'Limoeiro do norte',
            state: 'Ceará',
            phone: '998483192'
        })

        expect(response.statusCode).toEqual(201)
    })
})