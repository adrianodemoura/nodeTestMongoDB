const faker = require("faker-br")
const User = require("../../src/app/Models/User")
const mongoose = require("mongoose")

describe("Testes sobre o usuário", () => {
  beforeAll(async () => {
    await require("../../connect")
    await User.deleteMany()
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  it("O usuário deve ser criado", async () => {
    const UserModel = await new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      municipio: faker.address.city(),
      uf: faker.address.stateAbbr(),
    })

    await UserModel.save().catch((err) => {
      console.log(err)
    })

    expect(await User.count()).toBe(1)
  })
})
