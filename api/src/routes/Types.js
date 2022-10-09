const { Router } = require('express')
const axios = require('axios')
const router = Router()

router.get('/', async (req,res)=>{
    const pokeApi = await axios.get('https://pokeapi.co/api/v2/type')
    res.status(200).json(pokeApi.data.results)
})

module.exports = router