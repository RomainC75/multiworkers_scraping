const router = require('express').Router()
const Pokemon = require('../models/pokemon')

router.post('/', async (req,res,next)=>{
    try {
        const {name, url, price} = req.body
        const ans = await Pokemon.saveUrl(name, url, price)
        console.log('==>', ans)     
    } catch (error) {
        console.log('error : ', error)
        next(error)
    }
    
})

module.exports=router