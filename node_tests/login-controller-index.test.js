const request = require("supertest");
const app = require("../src/app");
const { dataBaseConnectionMongoDB } = require("../src/config/connection");

describe("Teste Inicial", () => {
  beforeAll(async () => {
    //await mongoConnect()
    //console.log('passei aqui no beforeAll')
  });

  afterAll(async () => {
    //await dataBaseConnectionMongoDB.close()
    //console.log( 'passei aqui no afterAll' )
  });

  test("Testa se página inicial está ok", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toEqual(200);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});
