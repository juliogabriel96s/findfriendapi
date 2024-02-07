import { DogRepository } from "@/repositories/dog-repository"
import { OrganizationRepository } from "@/repositories/organization-repository"
import { Age, Dog, Size } from "@prisma/client"
import { ResourceNotFound } from "./errors/ResourceNotFound"

interface RegisterNewDogUseCaseRequest{
    name: string
    description: string | null
    age: Age
    size: Size
    organizationId: string
}

interface RegisterNewDogUseCaseResponse{
    dog: Dog
}

export class RegisterNewDogUseCase{
    constructor(
        private organizationRepository: OrganizationRepository,
        private dogRepository: DogRepository
        ){}


        async execute({
            name,
            description,
            age,
            size,
            organizationId
        }:RegisterNewDogUseCaseRequest):Promise<RegisterNewDogUseCaseResponse>{
            const organization = await this.organizationRepository.findById(organizationId)

            if(!organization){
                throw new ResourceNotFound()
            }

            const dog = await this.dogRepository.create({
                name,
                description,
                age,
                size,
                organizationId
            })

            return{
                dog
            }
        }
}