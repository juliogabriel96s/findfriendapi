import { InvalidCredentialError } from "@/use-cases/errors/InvalidCredentialError";
import { makeAuthenticateOrganizationUseCase } from "@/use-cases/factories/make-authenticate-organization";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply
){

    const authenticateOrganizationBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {email, password} = authenticateOrganizationBodySchema.parse(request.body)

    try{
        const authenticateOrganizationUseCase = makeAuthenticateOrganizationUseCase()

        const {organization} = await authenticateOrganizationUseCase.execute({
            email,
            password
        })

        const authToken = await reply.jwtSign(
            {},
            {
                sign:{
                    sub: organization.id
                }
            }
        )

        return reply.status(200).send({authToken})
    }catch(err){
       if(err instanceof InvalidCredentialError){
        return reply.status(400).send({message: err.message})
       }

       throw err
    }

}