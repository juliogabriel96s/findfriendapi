import { it, expect, describe, beforeAll, afterAll } from "vitest";
import request from 'supertest'
import { app } from "@/app";

describe('E2E Authenticate', () =>{
    beforeAll(async () =>{
        await app.ready()
    })

    afterAll(async () =>{
       await app.close()
    })

    it('Should be able to athenticate', async() =>{
        await request(app.server).post('/register').send({
            name: 'John doe org',
            email: 'johndoe@example.com', 
            password: 'gabriel12345',
            city: 'Limoeiro do norte',
            state: 'Ceará',
            phone: '998483192'
        })

        const response = await request(app.server).post('/session').send({
            email: 'johndoe@example.com', 
            password: 'gabriel12345'
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            authToken: expect.any(String)
        })
    })
})