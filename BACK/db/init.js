const db = require('./db')

const initDb = async () =>{
    await db.query(`
    CREATE TABLE IF NOT EXISTS pokemon (
        id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(300),
        url VARCHAR(300),
        isAnalysed BOOLEAN DEFAULT false,
        price FLOAT,
        description VARCHAR(500)
    )
    `)
}

module.exports=initDb