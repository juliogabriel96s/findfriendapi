import { PrismaDogRepository } from "@/repositories/prisma/prisma-dog-repository";
import { GetSpecificDogUseCase } from "../get-specific-dog";


export function makeGetSpecificDogUseCase(){
    const dogRepository = new PrismaDogRepository()

    const getSpecificDogUseCase = new GetSpecificDogUseCase( dogRepository )

    return getSpecificDogUseCase
}