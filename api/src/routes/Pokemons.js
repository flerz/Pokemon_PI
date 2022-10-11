const { Router } = require('express')
const axios = require('axios')
const router = Router()
const { Pokemon, Tipo } = require('../db.js')

router.post('/', async (req,res)=>{
    const {name, hp, attack, defense, speed, height, weight, types } = req.body
    try {
        const newpokemon = await Pokemon.create({name:name, hp:hp, attack:attack, defense:defense, speed:speed, height:height, weight:weight})

        console.log( types.lenght)

        //for(let i=0; i < types.lenght; i++)
        types.forEach(async (t)=>{
            let poketypes = await Tipo.findOne({ where: { name: t.name } })
            await newpokemon.addTipo(poketypes, {through: {selfGranted: false}})
            console.log(await Pokemon.findOne({where:{name:newpokemon.dataValues.name}, include: Tipo}))
        })
        res.status(201).json({message: "new pokemon added to the pokedex!!"})    
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
})

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



module.exports = router