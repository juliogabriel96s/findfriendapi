import { DogRepository } from "@/repositories/dog-repository"
import { Age, Dog, Size } from "@prisma/client"


interface SearchDogUseCaseRequest{
    city: string
    age: Age | null
    size: Size | null
}

interface SearchDogUseCaseResponse{
    dogs: Dog[]
}

export class SearchDogsUseCase{
    constructor(private dogRepository: DogRepository){}

    async execute(data: SearchDogUseCaseRequest): Promise<SearchDogUseCaseResponse>{

        const dogs = await this.dogRepository.findManyByQuery(data)

        return {
            dogs
        }
        
    }
}