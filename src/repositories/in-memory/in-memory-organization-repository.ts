import { OrganizationRepository } from "../organization-repository";
import { Prisma, Organization } from "@prisma/client";

export class inMemoryOrganizationRepository implements OrganizationRepository{
  
    
    public items: Organization[] = []

  async findById(id: string) {
    const organization = this.items.find(item => item.id === id)

if(!organization){
    return null
}

return organization
    }


async create(data: Prisma.OrganizationCreateInput) {
const organization = {
    id: 'organization-1',
    name: data.name,
    email: data.email,
    password_hash: data.password_hash,
    city: data.city,
    state: data.state,
    phone: data.phone,
    created_at: new Date()
}

this.items.push(organization)

return organization
}
async findByEmail(email: string) {
const organization = this.items.find(item => item.email === email)

if(!organization){
    return null
}

return organization
}

async findDogByCity(city: string) {
    return this.items.filter(
        (item) => item.city.toLocaleLowerCase() === city.toLocaleLowerCase())
}

}