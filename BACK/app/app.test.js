const request = require('supertest')
const app = require('./app')




describe("hello",()=>{
    it("GET /hello -> string message",()=>{
        return request(app).get('/hello').expect(200)
    })
})