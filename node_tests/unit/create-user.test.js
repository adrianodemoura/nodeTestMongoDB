const faker = require("faker-br")
const User = require("../../src/app/Models/User")
const mongoose = require("mongoose")

describe("Testes sobre o usuário", () => {
  beforeAll(async () => {
    await require("../../connect")
  })

  beforeEach(async ()=> {
    await User.deleteMany()
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  it("O usuário deve ser criado", async () => {
    const UserModel = await new User({
        name: faker.name.findName()
      , email: faker.internet.email()
      , password: faker.internet.password()
      , municipio: faker.address.city()
      , uf: faker.address.stateAbbr()
    })

    const UserValidate = await UserModel.validateSync()
    await UserModel.save()

    expect( UserValidate ).toBe(undefined)
    expect( await User.count() ).toBe(1)
  })

  it("A inclusão do usuário dever falhar porque não tem senha", async() => {
    const UserModel = await new User({
        name: faker.name.findName()
      , email: faker.internet.email()
      , municipio: faker.address.city()
      , uf: faker.address.stateAbbr()
    })

    const UserValidate = await UserModel.validateSync()
    try { await UserModel.save() } catch (err) { }

    expect( await User.count() ).toBe(0)
    expect( !!UserValidate.message ).toBe(true)
    expect( UserValidate.message ).toBe('User validation failed: password: The password is mandatory')
  })
})
