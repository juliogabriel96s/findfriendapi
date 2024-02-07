import { Age, Dog, Prisma, Size } from "@prisma/client";

export interface SearchDogs{
 city: string
 age: Age | null
 size: Size | null   
}

export interface DogRepository{
    create(data: Prisma.DogUncheckedCreateInput): Promise<Dog>
    findById(id: string): Promise<Dog | null>
    findManyByQuery(data: SearchDogs): Promise<Dog[]>
}