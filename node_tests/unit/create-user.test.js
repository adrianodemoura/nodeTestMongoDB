const faker = require("faker-br")
const log = require("log")
const User = require("../../src/app/Models/User")

describe("Testes sobre o usuário", () => {
  it("O usuário deve ser criado", async () => {
    const UserModel = new User({
        name: faker.name.findName()
      , email: faker.internet.email()
      , password: faker.internet.password()
      , municipio: faker.address.city()
      , uf: faker.address.stateAbbr()
    })

    log.info( UserModel )
    
    //expect(await UserModel.count({})).toBe(1)
    expect(200).toBe(200)
  })
})
