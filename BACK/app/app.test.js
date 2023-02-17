const { describe } = require('node:test')
const request = require('supertest')
const app = require('./app')

const newPokemon = {
    name:"Bulbazar",
    url:"https://scrapeme.live/shop/Caterpii/",
    price:28
}


describe("hello",()=>{
    it("GET /hello -> string message",()=>{
        return request(app).get('/hello').expect(200)
    })
})

describe('/scrape',()=>{
    it('GET /scrape',()=>{
        return request(app).get('/scrape').expect(200).then(response=>{
            expect(response.body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    name:expect.any(String),
                    url:expect.any(String),
                    price: expect.any(Number)
                })
            ]))
        })
    })
    it('POST /scrape --> create new Pokemon',()=>{
        
        return request(app).post('/scrape').send(newPokemon).expect(201).then(response=>{
            expect(response.body).toEqual(expect.objectContaining({
                message:expect.stringContaining("pokemon registered"),
                insertedId:expect.any(Number)
            }))
        })
    })
})