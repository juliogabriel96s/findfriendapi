import { PrismaDogRepository } from "@/repositories/prisma/prisma-dog-repository";
import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository";
import { fetchAllDogSpecificCityUseCase } from "../fetch-all-dog-specific-city";


export function makeFetchAllDogSpecificCityUseCase(){
    const dogRepository = new PrismaDogRepository()
    const organizationRepository = new PrismaOrganizationRepository()

    const fetchAllDogSpecificCity = new fetchAllDogSpecificCityUseCase(
        organizationRepository,
        dogRepository
    )

    return fetchAllDogSpecificCity
}