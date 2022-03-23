const request = require("supertest")
const faker = require("faker-br")
const app = require("../../src/app")

describe("Sobre o Usuário", () => {
  test("Deve incluir um usuário", async () => {

    const response = await request(app)
    .post("/user_store")
    .send({
        name: faker.name.findName()
      , email: faker.internet.email()
      , password: faker.internet.password()
    })
    .set("Authorization", `Bearer 123123`)

    console.log( response.body )

    expect(response.statusCode).toBe(200)
    /*expect(res.status, 'res.body.message').toBe(200)
    expect(res.body, 'res.body.message').toHaveProperty("message")*/
  })
})
