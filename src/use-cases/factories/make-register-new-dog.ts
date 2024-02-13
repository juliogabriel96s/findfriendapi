import { PrismaDogRepository } from "@/repositories/prisma/prisma-dog-repository";
import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository";
import { RegisterNewDogUseCase } from "../register-dog";


export function makeRegisterDogUseCase(){
    const dogRepository = new PrismaDogRepository()
    const organizationRepository = new PrismaOrganizationRepository()

    const registerDogUseCase = new RegisterNewDogUseCase(
        organizationRepository,
        dogRepository
    )

    return registerDogUseCase
}