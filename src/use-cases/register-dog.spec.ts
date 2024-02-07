import { InMemoryDogRepository } from "@/repositories/in-memory/in-memory-dog-repository";
import { inMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { expect, it, describe, beforeEach } from "vitest";
import { RegisterNewDogUseCase } from "./register-dog";
import { hash } from "bcryptjs";
import { ResourceNotFound } from "./errors/ResourceNotFound";

let organizationRepository: inMemoryOrganizationRepository
let dogRepository: InMemoryDogRepository
let sut: RegisterNewDogUseCase

describe('Register a new dog', () =>{
    beforeEach(async () =>{
        organizationRepository = new inMemoryOrganizationRepository()
        dogRepository = new InMemoryDogRepository
        sut = new RegisterNewDogUseCase(organizationRepository, dogRepository)


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

    it('should be able to register new dog', async() =>{
        const {dog} = await sut.execute({
            name: 'dog teste',
            description: 'pet tranquilo',
            age: 'puppy',
            size: 'medium',
            organizationId: 'organization-1'
        })

        expect(dog.id).toEqual(expect.any(String))
    })

    it('should not be able to register a new dog with organizationId wrong', async() =>{
        await expect(() =>sut.execute({
            name: 'dog teste',
            description: 'pet tranquilo',
            age: 'puppy',
            size: 'medium',
            organizationId: 'organization-error'
        })).rejects.toBeInstanceOf(ResourceNotFound)
    })

})



