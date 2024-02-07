import { inMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import {expect, it, describe, beforeEach} from 'vitest'
import { RegisterOrganizationUseCase } from './register-organization'
import { compare } from 'bcryptjs'
import { EmailAlreadyExists } from './errors/EmailAlreadyExists'


let registerOrganizationRepository: inMemoryOrganizationRepository
let sut: RegisterOrganizationUseCase

describe('Register organization use case',() =>{
    beforeEach(() =>{

        registerOrganizationRepository = new inMemoryOrganizationRepository()

        sut = new RegisterOrganizationUseCase(registerOrganizationRepository)
    })

    it('Should be able to register a new organization ', async() =>{
        const {organization} = await sut.execute({
            name: 'John doe org',
            email: 'johndoe@example.com', 
            password: 'gabriel12345',
            city: 'Limoeiro do norte',
            state: 'Ceará',
            phone: '998483192'
 })

 expect(organization.id).toEqual(expect.any(String))
}) 

it('password must match', async() =>{
    const {organization} = await sut.execute({
        name: 'John doe org',
        email: 'johndoe@example.com', 
        password: 'gabriel12345',
        city: 'Limoeiro do norte',
        state: 'Ceará',
        phone: '998483192'
})

const isPasswordCorrectHash = await compare('gabriel12345', organization.password_hash)

expect(isPasswordCorrectHash).toBe(true)
})


it('Should not be able register twice organization with same email', async() =>{
   await sut.execute({
        name: 'John doe org',
        email: 'johndoe@example.com', 
        password: 'gabriel12345',
        city: 'Limoeiro do norte',
        state: 'Ceará',
        phone: '998483192'
})

await expect(() => sut.execute({
    name: 'John doe org',
    email: 'johndoe@example.com', 
    password: 'gabriel12345',
    city: 'Limoeiro do norte',
    state: 'Ceará',
    phone: '998483192'
})).rejects.toBeInstanceOf(EmailAlreadyExists)



})
})