const router = require('express').Router()
// const Pokemon = require('../models/pokemon.model')


router.get('/',(req,res,next)=>{
    res.status(200).json({message:'Hello!'})
})

router.get('/emit',async(req,res,next)=>{
    global.io.emit('news',{hello:'HOOOOOO'})
    // const count = await Pokemon.getPokemonHalfEntriesCount()
    res.status(200).json({message: 'emit'})
})

module.exports = router