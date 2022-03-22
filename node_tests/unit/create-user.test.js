const supertest = require("supertest")
const factory = require('../factories')


describe('Testes sobre o usuário', () => {
    it('O usuário deve ser criado', async () => {

        const UserFactory = await factory.create('User', {password: '123123'})

        expect( await UserFactory.total() ).toBe(1)
    })
})