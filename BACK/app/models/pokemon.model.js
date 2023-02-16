const mysql = require('mysql2')
const db=require('../db/db')

module.exports =  class Pokemon{
    constructor(){

    }
    static async saveUrl(name, url, price){
        try {
            return await db.query(
                "INSERT INTO `pokemon` (`name`, `url`, `price`) VALUES  ( ? , ? , ? )",
            [name, url, price])
        } catch (error) {
            console.log('errror ', error)
        }
    }
    static async getPokemonByUrl(url){
        try {
            return await db.query(
                " SELECT * FROM pokemon WHERE url = ? ",
            [url])
        } catch (error) {
            console.log('==>getPokemonByUrl -- error', error)
        }
    }

    async getPokemonById(id){
        try {
            const [[foundPokemon]] = await db.query(
                " SELECT * FROM pokemon WHERE id = ? ",
            [id])
            return foundPokemon
        } catch (error) {
            console.log('==>getPokemonByid -- error', error)
        }
    }

    static async getFirstWaitingPokemon(){
        try{
            const [[foundPokemon]] = await db.query(
                " SELECT * FROM pokemon WHERE isAnalysed = 0 AND isWaiting = 0 LIMIT 1"
            )
            
            const pokemonId = foundPokemon.id
            const ans = await db.query(
                " UPDATE `pokemon` SET `isWaiting` = 1 WHERE `id` = '?';  ",
                [pokemonId]
            )
            console.log('ans : ', ans)
            console.log('foundPokemon : ', foundPokemon)
            delete foundPokemon.isWaiting
            return foundPokemon            
        }catch(error){
            console.log('=>getFirstWaintingPokemon error : ', error)
        }
    }

    async updateDescriptionAndStockWithId(id,data){
        try{
            console.log('data : ', data.description, data.stock)
            const foundPokemon = await this.getPokemonById(id)
            console.log('++> foundPokemon', foundPokemon)
            if(!foundPokemon){
                return null
            }
            const ans = await db.query(
                " UPDATE pokemon SET `description`= ? , `stock`= ? , isAnalysed = 1 WHERE `id` = ? ",
                [data.description, data.stock, id]
            )
            return ans
        }catch(error){
            console.log('==>updateDescriptionAndStockWithId error', error)
        }
    }

    
    // static async save
}