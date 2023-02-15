const axios = require('axios')
require('dotenv').config()

module.exports= class API{
    constructor(){
        this.API_URL=process.env.API_URL
    }
    static async postNewLink(pokemon){
        return new Promise(async(resolve, reject)=>{
            try {
                console.log(`${this.API_URL}/scrape`)
                const ans = await axios.post(`http://localhost:5000/scrape`,pokemon)
                console.log('--sraper-- ans : ', ans)
                resolve(ans)
            } catch (error) {
                reject(error)
            }
        })
    }
}