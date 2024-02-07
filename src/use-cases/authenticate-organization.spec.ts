import { expect, it, describe, beforeEach } from "vitest";
import { AuthenticateOrganizationUseCase } from "./authenticate-organization";
import { inMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialError } from "./errors/InvalidCredentialError";


let organizationRepository: inMemoryOrganizationRepository
let sut: AuthenticateOrganizationUseCase

describe('Authenticate organization use case', () =>{
    beforeEach(() =>{
        organizationRepository = new inMemoryOrganizationRepository()
        sut = new AuthenticateOrganizationUseCase(organizationRepository)
    })


    it('Should be able to authenticate a organization', async () =>{
        await organizationRepository.create({
            name: 'John doe org',
            email: 'johndoe@example.com', 
            password_hash: await hash('gabriel12345', 6),
            city: 'Limoeiro do norte',
            state: 'Ceará',
            phone: '998483192'
    })

    const {organization} = await sut.execute({
        email: 'johndoe@example.com',
        password: 'gabriel12345'
    })

    expect(organization.id).toEqual(expect.any(String))
    
    })



    it('Should not be able to authenticate a organization with email wrong', async () =>{
        await organizationRepository.create({
            name: 'John doe org',
            email: 'johndoe@example.com', 
            password_hash: await hash('gabriel12345', 6),
            city: 'Limoeiro do norte',
            state: 'Ceará',
            phone: '998483192'
    })

    await expect(() => sut.execute({
        email: 'john@example.com',
        password: 'gabriel12345'
    }) ).rejects.toBeInstanceOf(InvalidCredentialError)

    
    })


    it('Should not be able to authenticate a organization with password wrong', async () =>{
        await organizationRepository.create({
            name: 'John doe org',
            email: 'johndoe@example.com', 
            password_hash: await hash('gabriel12345', 6),
            city: 'Limoeiro do norte',
            state: 'Ceará',
            phone: '998483192'
    })

    await expect(() => sut.execute({
        email: 'johndoe@example.com',
        password: '1234567'
    }) ).rejects.toBeInstanceOf(InvalidCredentialError)

    
    })
}) 