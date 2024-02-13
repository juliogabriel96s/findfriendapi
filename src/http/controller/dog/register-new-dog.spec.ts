import { expect, it , describe, beforeAll, afterAll } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createAndAuthenticateOrganization } from "@/utils/create-and-authenticate-organization";

describe('E2E register new dog', () =>{
    beforeAll(async() =>{
        await app.ready()
    })

    afterAll(async() =>{
        await app.close()
    })

    it('Should be able register new dog', async() =>{
        const { authToken } = await createAndAuthenticateOrganization(app)

        const registerNewDog = await request(app.server)
        .post('/register/dog')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
            name: 'dog teste',
            description: 'pet tranquilo',
            age: 'puppy',
            size: 'medium',
        })

        expect(registerNewDog.statusCode).toEqual(201)
        expect(registerNewDog.body.dog).toEqual(
            expect.objectContaining({
                name: 'dog teste'
            })
        )
    })
})