import { EmailAlreadyExists } from "@/use-cases/errors/EmailAlreadyExists";
import { makeRegisterNewOrganizationUseCase } from "@/use-cases/factories/make-register-organization";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(
    request: FastifyRequest,
    reply: FastifyReply
    ){

        const registerorganizationBodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6),
            city: z.string(),
            state: z.string(),
            phone: z.string()
        })

        const {
            name,
            email,
            password,
            city,
            state,
            phone
        } = registerorganizationBodySchema.parse(request.body)

        try{
            const registerOrganizationUseCase = makeRegisterNewOrganizationUseCase()

            await registerOrganizationUseCase.execute({
                name,
                email,
                password,
                city,
                state,
                phone
            })
        }catch(err){
            if(err instanceof EmailAlreadyExists){
                return reply.status(409).send({message: err.message})           
             }

             throw err

        }
        return reply.status(201).send()
}