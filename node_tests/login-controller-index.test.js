const request = require("supertest")
const app = require("../src/app")

describe("Teste Inicial", () => {
  test("Testa se página inicial está ok", async () => {
    const res = await request(app).get("/")

    expect(res.statusCode).toEqual(200)
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty("message")
  })
})
