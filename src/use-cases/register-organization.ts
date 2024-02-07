import { Organization } from "@prisma/client";
import { OrganizationRepository } from "@/repositories/organization-repository";
import {hash} from 'bcryptjs'
import { EmailAlreadyExists } from "./errors/EmailAlreadyExists";

interface RegisterOrganizationUseCaseRequest{
    name: string
    email: string
    password: string
    city: string
    state: string
    phone: string
}

interface RegisterOrganizationUseCaseResponse{
    organization: Organization
}

export class RegisterOrganizationUseCase{
    constructor(private organizationsRepository: OrganizationRepository){}

    async execute({
     name,
     email,
     password,
     city,
     state,
     phone
    }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse>{
        const password_hash = await hash(password, 6)

        const sameEmail = await this.organizationsRepository.findByEmail(email)

        if(sameEmail){
            throw new EmailAlreadyExists()
        }

        const organization = await this.organizationsRepository.create({
            name,
            email,
            password_hash,
            city,
            state,
            phone
        })

        return {organization}
    }
}