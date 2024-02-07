import { Prisma, Dog, $Enums } from "@prisma/client";
import { DogRepository, SearchDogs } from "../dog-repository";
import { randomUUID } from "crypto";

export class InMemoryDogRepository implements DogRepository{
    
   
    public items :  Dog[] = []

   async create(data: Prisma.DogUncheckedCreateInput) {

    const dog = {
        id: randomUUID(),
        name: data.name,
        description: data.description ? data.description: null,
        age: data.age,
        size: data.size,
        organizationId: data.organizationId,
        created_at: new Date()
    }

    this.items.push(dog)

    return dog
}

async findById(id: string){
    const dog = this.items.find(item => item.id === id)

    if(!dog){
        return null
    }

    return dog
}

async findManyByQuery({age, size}: SearchDogs) {
let dogs = this.items

if(age){
    dogs = this.items.filter((item) => item.age === age)
}

if(size){
    dogs = this.items.filter((item) => item.size === size)
}

return dogs
}

}