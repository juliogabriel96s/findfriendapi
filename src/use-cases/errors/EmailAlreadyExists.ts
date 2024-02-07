export class EmailAlreadyExists extends Error{
    constructor(){
        super('Email or password are wrong')
    }
}