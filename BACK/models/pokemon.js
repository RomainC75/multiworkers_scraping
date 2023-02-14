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
}