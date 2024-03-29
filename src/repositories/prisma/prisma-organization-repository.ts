import { Prisma } from "@prisma/client";
import { OrganizationRepository } from "../organization-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrganizationRepository implements OrganizationRepository{
    async create(data: Prisma.OrganizationCreateInput) {
     
        const organization = await prisma.organization.create({
            data
        })

        return organization

    }
    async findByEmail(email: string) {

        const organization = await prisma.organization.findUnique({
           where:{
            email
           }
        })

        return organization

    }
    async findById(id: string) {

        const organization = await prisma.organization.findFirst({
            where:{
                id
            }
        })

        return organization

    }
    async findDogByCity(city: string) {
        const organization = await prisma.organization.findMany({
            where:{
            }
        })
        return organization
    }

}