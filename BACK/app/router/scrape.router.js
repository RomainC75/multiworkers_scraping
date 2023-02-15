const router = require('express').Router()
const Pokemon = require('../models/pokemon.model')

router.post('/', async (req,res,next)=>{
    try {
        if(!('name' in req.body) || !('url' in req.body || !('price' in req.body))){
            res.status(400).json({message:'need 3 keys : name, url ans price'})
        }
        const {name, url, price} = req.body
        const ans = await Pokemon.saveUrl(name, url, price)
        console.log("ans : ",ans)
        
    } catch (error) {
        console.log('error : ', error)
        next(error)
    }
    
})

module.exports=router