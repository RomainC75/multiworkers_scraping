const axios = require('axios')
require('dotenv').config()
// const url = "http://localhost:5000/scrape"
const url = "http://backend"

module.exports= class API{
    constructor(){
        
    }
    static async postNewLink(pokemon){
        return new Promise(async(resolve, reject)=>{
            try {
                const fullAddress = `${url}:5000/scrape`
                console.log("==> full address : ", fullAddress)
                const ans = await axios.post(fullAddress,pokemon)
                console.log('--sraper-- ans : ', ans)
                resolve(ans)
            } catch (error) {
                reject(error)
            }
        })
    }
}