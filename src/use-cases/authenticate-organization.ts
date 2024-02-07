import { OrganizationRepository } from "@/repositories/organization-repository"
import { Organization } from "@prisma/client"
import { InvalidCredentialError } from "./errors/InvalidCredentialError"
import { compare } from "bcryptjs"


interface AuthenticateOrganizationUseCaseRequest{
    email: string
    password: string
}

interface AuthenticateOrganizationUseCaseResponse{
   organization: Organization
}

export class AuthenticateOrganizationUseCase{
    constructor(private organizationRepository: OrganizationRepository){}

    async execute({
        email, 
        password
    }: AuthenticateOrganizationUseCaseRequest): Promise<AuthenticateOrganizationUseCaseResponse>{
        const organization = await this.organizationRepository.findByEmail(email)

        if(!organization){
            throw new InvalidCredentialError()
        }

        const passwordMatchWithHash = await compare( password, organization.password_hash)

        if(!passwordMatchWithHash){
            throw new InvalidCredentialError()
        }


        return{
            organization
        }

    }
}