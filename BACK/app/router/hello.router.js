const router = require('express').Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({message:'Hello!'})
})

router.get('/emit',(req,res,next)=>{
    global.io.emit('news',{hello:'HOOOOOO'})
    res.status(200).json({message: 'emit'})
})

module.exports = router