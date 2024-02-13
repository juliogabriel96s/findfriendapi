import { InMemoryDogRepository } from "@/repositories/in-memory/in-memory-dog-repository";
import { inMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { expect, it, describe, beforeEach } from "vitest";
import { fetchAllDogSpecificCityUseCase } from "./fetch-all-dog-specific-city";
import { hash } from "bcryptjs";

let dogRepository: InMemoryDogRepository
let organizationRepository: inMemoryOrganizationRepository
let sut: fetchAllDogSpecificCityUseCase

describe('Search dogs by city use case',() =>{
    beforeEach(() =>{
        dogRepository = new InMemoryDogRepository()
        organizationRepository = new inMemoryOrganizationRepository()
        sut = new fetchAllDogSpecificCityUseCase(organizationRepository, dogRepository)
    })

    it('Should be able to list all dogs based in city', async () =>{
        const organization =   await organizationRepository.create({
            id: 'organization-1',
            name: 'John doe org',
            email: 'johndoe@example.com', 
            password_hash: await hash('gabriel12345', 6),
            city: 'Limoeiro',
            state: 'Ceará',
            phone: '998483192'
    })

    await organizationRepository.create({
        id: 'organization-2',
        name: 'John leo org',
        email: 'johndoe@example.com', 
        password_hash: await hash('gabriel12345', 6),
        city: 'russas',
        state: 'Ceará',
        phone: '998483192'
})

 await dogRepository.create({
    name: 'dog teste',
    description: 'pet tranquilo',
    age: 'puppy',
    size: 'medium',
    organizationId: organization.id
})

const {dogs} = await sut.execute({city: 'russas'})
expect(dogs).toHaveLength(1)
    })
})