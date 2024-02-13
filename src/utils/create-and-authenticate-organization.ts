import { FastifyInstance } from "fastify";
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance){
    await request(app.server).post('/register').send({
        name: 'John doe org',
        email: 'johndoe@example.com', 
        password: 'gabriel12345',
        city: 'Limoeiro do norte',
        state: 'Ceará',
        phone: '998483192'
    })

    const authResponse = await request(app.server).post('/session').send({
        email: 'johndoe@example.com', 
        password: 'gabriel12345'
    })

    const {authToken} = authResponse.body

    return authToken
}