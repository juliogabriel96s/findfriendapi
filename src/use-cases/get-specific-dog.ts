import { DogRepository } from "@/repositories/dog-repository"
import { Dog } from "@prisma/client"
import { DogNotExisting } from "./errors/DogNotExisting"

interface GetSpecificDogUseCaseRequest{
    dogId: string
}
interface GetSpecificDogUseCaseResponse{
    dog: Dog
}

export class GetSpecificDogUseCase{
    constructor(private dogRepository: DogRepository){}

    async execute({
        dogId
    }: GetSpecificDogUseCaseRequest):Promise<GetSpecificDogUseCaseResponse>{
        const dog = await this.dogRepository.findById(dogId)

        if(!dog){
            throw new DogNotExisting()
        }
        return{
            dog
        }
}
}