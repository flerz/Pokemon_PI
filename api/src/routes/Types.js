const { Router } = require('express')
const axios = require('axios')
const { Tipo }= require('../db.js')
const router = Router()

router.get('/', async (req,res)=>{
    const types = await Tipo.findAll()
    if(!types.lenght){
        const pokeApi = await axios.get('https://pokeapi.co/api/v2/type')
        bulkinTypes = pokeApi.data.results.map((t)=>{
            return {name:t.name}
        })
        await Tipo.bulkCreate(bulkinTypes)
    }
    
    res.status(200).json(await Tipo.findAll())
})

module.exports = router