const axios = require('axios')
require('dotenv').config()
// const url = "http://localhost:5000"
const url = "http://backend:5000"

module.exports= class API{
    constructor(){
        
    }
    // static async postNewLink(pokemon){
    //     return new Promise(async(resolve, reject)=>{
    //         try {
    //             const fullAddress = `${url}/scrape`
    //             console.log("==> full address : ", fullAddress)
    //             const {data} = await axios.post(fullAddress,pokemon)
    //             console.log('--sraper-- data : ', data)
    //             resolve(data)
    //         } catch (error) {
    //             reject(error)
    //         }
    //     })
    // }
    static async postNewLinks(pokemons){
        return new Promise(async(resolve,reject)=>{
            try {
                const fullAddress = `${url}/scrape/`
                const {data} = await axios.post(fullAddress,pokemons)
                resolve(data)
            } catch (error) {
                console.log("==>ERROR postNewLinks : ", error)
                reject(error)
            }
        })
    }
}