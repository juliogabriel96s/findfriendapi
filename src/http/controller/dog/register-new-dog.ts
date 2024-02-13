import { makeRegisterDogUseCase } from "@/use-cases/factories/make-register-new-dog";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerNewDog(
    request: FastifyRequest,
    reply: FastifyReply
){
    const registerNewDogBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        age: z.enum(['puppy', 'adult']),
        size: z.enum(['small', 'medium', 'big'])
    })

    const organizationId = request.user.sub

    const {name, description, age, size} = registerNewDogBodySchema.parse(request.body)

    const registerNewDogUseCase = makeRegisterDogUseCase()

    const {dog} = await registerNewDogUseCase.execute({
        name,
        description,
        age,
        size,
        organizationId: organizationId
    })

    return reply.status(201).send({dog})

}