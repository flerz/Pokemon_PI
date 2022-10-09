const { Router } = require('express')
const axios = require('axios')
const router = Router()
const { Pokemon } = require('../db.js')

router.get('/', async (req,res)=>{
    const { name } = req.query
    if(!name){
        const pokeApi = await axios.get('https://pokeapi.co/api/v2/pokemon')
        res.status(200).json(pokeApi.data.results)
    }else{
        const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        res.status(200).json({name: pokeApi.data.name, hp: pokeApi.data.stats[0].base_stat, attack: pokeApi.data.stats[1].base_stat, defense: pokeApi.data.stats[2].base_stat, speed: pokeApi.data.stats[5].base_stat, height: pokeApi.data.height, weight: pokeApi.data.weight})
    }
})

router.get('/:id', async (req,res)=>{
    const { id } = req.params
    const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    res.status(200).json({name: pokeApi.data.name, hp: pokeApi.data.stats[0].base_stat, attack: pokeApi.data.stats[1].base_stat, defense: pokeApi.data.stats[2].base_stat, speed: pokeApi.data.stats[5].base_stat, height: pokeApi.data.height, weight: pokeApi.data.weight})
})

router.post('/', async (req,res)=>{
    const {name, hp, attack, defense, speed, height, weight } = req.body

    const newpokemon = await Pokemon.create({name, hp, attack, defense, speed, height, weight })

    console.log(newpokemon.id)
    

})

module.exports = router