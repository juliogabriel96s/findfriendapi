import { PrismaDogRepository } from "@/repositories/prisma/prisma-dog-repository";
import { SearchDogsUseCase } from "../search-dog";


export function makeSearchDogUseCase(){
    const dogRepository = new PrismaDogRepository()

    const searchDogUseCase = new SearchDogsUseCase(dogRepository)

    return searchDogUseCase
}