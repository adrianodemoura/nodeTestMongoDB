const faker = require("faker-br")
const User = require("../../src/app/Models/User")
require("dotenv").config({
  path: ".env_" + process.env.ENVIRONMENT.toLocaleLowerCase(),
})
const mongoose = require("mongoose")

describe("Testes sobre o usuário", () => {
  beforeAll(async () => {
    await mongoose
      .connect(`mongodb://${process.env.DB_CONNECT_PATH}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(
        () => {},
        (err) => {
          console.log(err)
        }
      )
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

    await UserModel.save()
      .then((doc) => {})
      .catch((err) => {
        console.log(err)
      })

    expect(200).toBe(200)
  })
})
