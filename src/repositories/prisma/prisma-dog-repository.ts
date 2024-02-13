import { Prisma, $Enums, Organization } from "@prisma/client";
import { DogRepository, SearchDogs } from "../dog-repository";
import { prisma } from "@/lib/prisma";

export class PrismaDogRepository implements DogRepository{
    async create(data: Prisma.DogUncheckedCreateInput) {
      const dog =  await prisma.dog.create({
        data
      })

      return dog
    }
    async findById(id: string){
        const dog = await prisma.dog.findFirst({
            where:{
                id
            }
        })

        return dog
    }
    async findManyByQuery({city, age, size,}: SearchDogs){
        const query: any = {}

        if(age !== null){
            query.age = age
        }
        if(size !== null){
            query.size = size
        }

        const dogs = await prisma.dog.findMany({
            where:{
                organization:{
                    city
                },
                ...query
            }
        })

        return dogs
    }
    async findManyByOrgs(orgs: Organization[]) {

        const orgId = orgs.map((org) => org.id)

        const dogs = await prisma.dog.findMany({
            where:{
                organizationId:{
                    in: orgId
                }
            }
        })

        return dogs

    }

}