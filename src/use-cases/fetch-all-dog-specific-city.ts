import { DogRepository } from "@/repositories/dog-repository"
import { OrganizationRepository } from "@/repositories/organization-repository"
import { Dog } from "@prisma/client"
import { ResourceNotFound } from "./errors/ResourceNotFound"

interface fetchAllDogSpecificCityUseCaseRequest{
    city: string
}

interface fetchAllDogSpecificCityUseCaseResponse{
    dogs: Dog[]
}

export class fetchAllDogSpecificCityUseCase{
    constructor(
        private organizationRepository: OrganizationRepository,
        private dogRepository: DogRepository
    ){}

    async execute({
        city
    }: fetchAllDogSpecificCityUseCaseRequest):Promise<fetchAllDogSpecificCityUseCaseResponse>{
        const organization = await this.organizationRepository.findDogByCity(city)

        if(organization.length === 0){
            throw new ResourceNotFound
        }

        const dogs = await this.dogRepository.findManyByOrgs(organization)

        return{
            dogs
        }
    }
}