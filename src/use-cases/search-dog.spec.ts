import { InMemoryDogRepository } from "@/repositories/in-memory/in-memory-dog-repository";
import { inMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { expect, it, describe, beforeEach } from "vitest";
import { SearchDogsUseCase } from "./search-dog";
import { hash } from "bcryptjs";

let dogRepository: InMemoryDogRepository
let organizationRepository: inMemoryOrganizationRepository
let sut: SearchDogsUseCase

describe('Search dogs use case', () =>{
    beforeEach(async () =>{
        dogRepository = new InMemoryDogRepository()
        organizationRepository = new inMemoryOrganizationRepository()
        sut = new SearchDogsUseCase(dogRepository)

        await organizationRepository.create({
            id: 'organization-1',
            name: 'John doe org',
            email: 'johndoe@example.com', 
            password_hash: await hash('gabriel12345', 6),
            city: 'Limoeiro do norte',
            state: 'Ceará',
            phone: '998483192'
    })

    })

    it('should be to search a dogs at specific filter ', async () =>{
        for(let i = 1; i <= 2; i++){
            await dogRepository.create({
                id: `dog-0${i}`,
                name: `dog-0${i}`,
                description: 'dog energico',
                age: 'adult',
                size: 'medium',
                organizationId: 'organization-id'
                
            })

            const { dogs } = await sut.execute({
                city: 'Node city',
                age: 'adult',
                size: null
            })

            console.log(dogs)

            expect(dogs).toHaveLength(2)
        }
    })
})