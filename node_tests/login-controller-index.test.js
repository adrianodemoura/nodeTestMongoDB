const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");

describe("Teste Inicial", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/nodejs", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.disconnect()
  });

  test("Testa se página inicial está ok", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toEqual(200);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});
