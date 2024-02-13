import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository";
import { RegisterOrganizationUseCase } from "../register-organization";


export function makeRegisterNewOrganizationUseCase(){
    const organizationRepository = new PrismaOrganizationRepository()

    const registerOrganizationUseCase = new RegisterOrganizationUseCase(organizationRepository)

    return registerOrganizationUseCase
}