import { InMemoryDogRepository } from "@/repositories/in-memory/in-memory-dog-repository";
import { expect, it, describe, beforeEach } from "vitest";
import { GetSpecificDogUseCase } from "./get-specific-dog";
import { inMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { hash } from "bcryptjs";
import { DogNotExisting } from "./errors/DogNotExisting";

let dogRepository: InMemoryDogRepository
let organizationRepository: inMemoryOrganizationRepository
let sut: GetSpecificDogUseCase

describe('Get specific dog', () =>{
    beforeEach(async () =>{
        dogRepository = new InMemoryDogRepository()
        organizationRepository = new inMemoryOrganizationRepository()
        sut = new GetSpecificDogUseCase(dogRepository)

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

    it('Should be get a dog by dogId', async () =>{
        const newDog = await dogRepository.create({
            name: 'dog teste',
            description: 'pet tranquilo',
            age: 'puppy',
            size: 'medium',
            organizationId: 'organization-1'
        })

        const {dog} = await sut.execute({
            dogId: newDog.id
        })

        expect(dog.id).toEqual(expect.any(String))
        expect(dog.name).toEqual( 'dog teste')
    })

    it('Should not be get a dog by invalid dogId', async () =>{
      await expect(() => sut.execute({
        dogId: 'dog-id-non-existent'
      })).rejects.toBeInstanceOf(DogNotExisting)
    })
})