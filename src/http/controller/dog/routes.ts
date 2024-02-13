import { FastifyInstance } from "fastify";
import { registerNewDog } from "./register-new-dog";
import { verifyJWT } from "../middlewares/verify-jwt";

export async function dogRoutes(app: FastifyInstance){
    app.post('/register/dog',{onRequest: [verifyJWT]} ,registerNewDog)
}