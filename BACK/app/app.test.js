const { describe } = require("node:test");
const request = require("supertest");
const app = require("./app");

const newPokemon = {
  name: "Bulbazar",
  url: "https://scrapeme.live/shop/Caterpii/",
  price: 28,
};
const newPokemonScrapingInfos = {
  description: "Super description",
  stock: 123,
};
let analysingPokemonId = null;

let idToDelete = null;

describe("hello", () => {
  it("GET /hello -> string message", () => {
    return request(app).get("/hello").expect(200);
  });
});

describe("/scrape", () => {
  afterEach(async () => {
    if (
      expect.getState().currentTestName ===
      "POST /scrape --> pokemon name already in DB"
    ) {
      return request(app).delete(`/scrape/${newPokemon.name}`).expect(200);
    }
  });

  it("GET /scrape", () => {
    return request(app)
      .get("/scrape")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              url: expect.any(String),
              price: expect.any(Number),
            }),
          ])
        );
      });
  });

  // POST //

  it("POST /scrape --> pokemon invalid", () => {
    const newInvalidPokemon = {
      ...newPokemon,
    };
    delete newInvalidPokemon.name;
    return request(app)
      .post("/scrape")
      .send(newInvalidPokemon)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.stringContaining(
              "need 3 keys : name, url ans price"
            ),
          })
        );
      });
  });
  it("POST /scrape --> create new Pokemon", () => {
    return request(app)
      .post("/scrape")
      .send(newPokemon)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.stringContaining("pokemon registered"),
            insertedId: expect.any(Number),
          })
        );
      });
  });
  it("POST /scrape --> pokemon name already in DB", () => {
    return request(app).post("/scrape").send(newPokemon).expect(400);
  });

  // NEXT
  it("GET /next --> get next pokemon AND modify the isWaiting value", async () => {
    const nextPokemonRaw = await request(app).get("/scrape/next");
    const { pokemon } = nextPokemonRaw.body;

    const sameNamePokemonRaw = await request(app).get(
      `/scrape/name/${pokemon.name}`
    );
    const sameNamePokemon = sameNamePokemonRaw.body;

    expect(pokemon.name).toEqual(sameNamePokemon.name);
    expect(sameNamePokemon.isWaiting).toEqual(1);
    analysingPokemonId = sameNamePokemon.id;
  });

  //   it('GET /next -> get 400 if there is no more pokemon to analyse',async()=>{

  //   })

  it("post /next/:id --> post the result of scraping", async () => {
    const nextPokemonRaw = await request(app)
      .post(`/scrape/next/${analysingPokemonId}`)
      .send({
        ...newPokemonScrapingInfos,
      });
    const response = nextPokemonRaw.body;
      expect(response.message).toEqual('updated')

    const sameNamePokemonRaw = await request(app).get(
      `/scrape/name/${response.preUpdatedPokemon.name}`
    );
    const sameNamePokemon = sameNamePokemonRaw.body;
    
    expect(newPokemonScrapingInfos.description).toEqual(sameNamePokemon.description);
    expect(newPokemonScrapingInfos.stock).toEqual(sameNamePokemon.stock)
    expect(sameNamePokemon.isAnalysed).toEqual(1);
  });

  it("post /next/:id -> post result at a wrong id", async () => {
    return request(app)
      .post(`/scrape/next/10000000`)
      .send({
        ...analysingPokemonId,
      })
      .expect(422)
      .then((response) => {
        expect(response.body.message).toEqual('oups, something wrong in the request')
      });
  });
});
