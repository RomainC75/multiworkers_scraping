const axios = require('axios')
require('dotenv').config()
// const url = "http://localhost:5000"
const url = "http://backend:5000"

module.exports= class API{
    constructor(){
        this.pokemon=null
    }
    async getNextPokemon(){
        return new Promise(async(resolve, reject)=>{
            try {
                const fullAddress = `${url}/scrape/next`
                const {data} = await axios.get(fullAddress)
                this.pokemon=data.pokemon
                resolve(data.pokemon)
            } catch (error) {
                reject(error)
            }
        })
    }
    async postDetails(description, stock){
        return new Promise(async(resolve, reject)=>{
            try {
                const fullAddress = `${url}/scrape/next/${this.pokemon.id}`
                const {data} = await axios.post(fullAddress,{
                    ...this.pokemon,
                    description,
                    stock
                })
                console.log('--WORKER : post -- data : ', data)
                resolve(data.pokemon)
            } catch (error) {
                reject(error)
            }
        })
    }
    getUrlToScrape(){
        console.log('this.pokemon : ', this.pokemon)
        return this.pokemon.url
    }
    
}