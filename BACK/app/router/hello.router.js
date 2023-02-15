const router = require('express').Router()

router.get('/',(res,res,next)=>{
    res.status(200).json({message:'Hello!'})
})

module.exports = router