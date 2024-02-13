import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { organizationRoutes } from "./http/controller/organization/routes";
import { dogRoutes } from "./http/controller/dog/routes";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
})

app.register(organizationRoutes)
app.register(dogRoutes)

app.setErrorHandler((error, request, reply) =>{
    if(error instanceof ZodError){
return reply
.status(400)
.send({message: 'Validation Error.', issues: error.format()})
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error)
    }else{
       // / here he should log to any external too like Datadog/NewRelic/Sentry
    }

    return reply.status(500).send({message: 'Internal server error.'})
})