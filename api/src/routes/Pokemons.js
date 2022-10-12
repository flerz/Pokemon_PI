const { Router } = require('express')
const axios = require('axios')
const router = Router()
const { Pokemon, Tipo } = require('../db.js')

//POSt routing to add a new pokemon to the DB
router.post('/', async (req,res)=>{
    //Destructuring the data from the body
    const {name, hp, attack, defense, speed, height, weight, types } = req.body
    //Errors handler
    try {
        //Adding the new pokemon to the DB only with the data require in the table
        const newpokemon = await Pokemon.create({name:name, hp:hp, attack:attack, defense:defense, speed:speed, height:height, weight:weight})
        //Iteration over every type of pokemon to add the info at the relations table named Pokemon_Tipo
        types.forEach(async (t)=>{
            let poketypes = await Tipo.findOne({ where: { name: t.name } })
            //Adding the pokemon type to the relation table
            await newpokemon.addTipo(poketypes, {through: {selfGranted: false}})
        })
        //Response to "server"
        res.status(201).json({message: "new pokemon added to the pokedex!!"})    
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
})

//Getting the list of pokemons or a pokemon by name
router.get('/', async (req,res)=>{
    //Destructuring possible name given in the route by query
    const { name } = req.query
    //Errrors handler
    try {
        //Veerification if a nama was given in the route
        if(!name){
            //Flow when the name wasn't given
            //Query to API
            const pokeApi = await axios.get('https://pokeapi.co/api/v2/pokemon')
            //Query to DB
            const pokedb = await Pokemon.findAll()
            //Structuring DB results in case there any at the DB
            const dbresults= pokedb?pokedb.map((p)=>{ return {name:p.dataValues.name}}):[]
            //Concatenating the results from API and DB
            const result = dbresults.length?[...dbresults, ...pokeApi.data.results]:[...pokeApi.data.results]
            //Response to "server"
            res.status(200).json(result)
        }else{
            //Flow when the name was given
            //Query to DB
            const pokedb = await Pokemon.findOne({where:{name:name}, include:Tipo})
            //Query to API in case there isn't a result from DB
            const pokeApi = pokedb?pokedb:await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            let resultname = {}
            //Structuring result
            if(!pokedb){
                //When the result comes from API
                Object.assign(resultname,{origin:"API",name: pokeApi.data.name, hp: pokeApi.data.stats[0].base_stat, attack: pokeApi.data.stats[1].base_stat, defense: pokeApi.data.stats[2].base_stat, speed: pokeApi.data.stats[5].base_stat, height: pokeApi.data.height, weight: pokeApi.data.weight, types: pokeApi.data.types})
            }else{
                //When the result comes from DB
                const tipos= pokedb.tipos.map((t)=>{return {id:t.dataValues.id, name: t.dataValues.name}})
                console.log(pokedb.dataValues)
                Object.assign(resultname ,{origin:"DB",name: pokedb.dataValues.name, hp: pokedb.dataValues.hp, attack: pokedb.dataValues.attack, defense: pokedb.dataValues.defense, speed: pokedb.dataValues.speed, height: pokedb.dataValues.height, weight: pokedb.dataValues.weight, types: tipos })
            }
            //Response to "server"
            res.status(200).json(resultname)
        }    
    } catch (error) {
        res.status(404).json({error: error.message, message: "Pokemon's name do not exist"})
    }
    
})


//Getting pokemon by ID
router.get('/:id', async (req,res)=>{
    //Destructuring data by params
    const { id } = req.params
    //Errors handler
    try {
        const resultid={}
        //Verification to determinate if the ID comes as an UUID
        if( !id.includes("-")){
            //When it doesn't come as an UUID 
            //Query to API
            const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            Object.assign(resultid,{origin:"API",name: pokeApi.data.name, hp: pokeApi.data.stats[0].base_stat, attack: pokeApi.data.stats[1].base_stat, defense: pokeApi.data.stats[2].base_stat, speed: pokeApi.data.stats[5].base_stat, height: pokeApi.data.height, weight: pokeApi.data.weight, types: pokeApi.data.types})
        }
        else{
            //When it comes as an UUID
            //Query to DB
            const pokedb = await Pokemon.findOne({where:{id:id}, include:Tipo})
            //Structuring types
            const tipos= pokedb.tipos.map((t)=>{return {id:t.dataValues.id, name: t.dataValues.name}})
            console.log(pokedb.dataValues)
            Object.assign(resultid ,{origin:"DB",name: pokedb.dataValues.name, hp: pokedb.dataValues.hp, attack: pokedb.dataValues.attack, defense: pokedb.dataValues.defense, speed: pokedb.dataValues.speed, height: pokedb.dataValues.height, weight: pokedb.dataValues.weight, types: tipos })
        }
        //Response to "server"
        res.status(200).json(resultid)    
    } catch (error) {
        res.status(404).json({error:error.message})    
    }
    
})



module.exports = router