const { Router } = require('express')
const axios = require('axios')
const router = Router()
const { Pokemon, Tipo } = require('../db.js')

//POSt routing to add a new pokemon to the DB
router.post('/', async (req,res)=>{
    //Destructuring the data from the body
    const {name, hp, attack, defense, speed, height, weight, ptypes, img_front, img_back} = req.body

    //Errors handler
    try {
        const pokeCheck = await Pokemon.findOne({where:{name:name}})
        if(pokeCheck){
            res.status(200).json({message:"Pokemon Already exist"})
        }
        else{
            //Adding the new pokemon to the DB only with the data require in the table
            const newpokemon = await Pokemon.create({name:name, hp:hp, attack:attack, defense:defense, speed:speed, height:height, weight:weight, img_front:img_front, img_back:img_back})
            //Iteration over every type of pokemon to add the info at the relations table named Pokemon_Tipo
            ptypes.forEach(async (t)=>{
                let poketypes = await Tipo.findOne({ where: { name: t.name } })
                //Adding the pokemon type to the relation table
                await newpokemon.addTipo(poketypes)
                
            })
            var result = await Pokemon.findOne({where:{name:name}, include:Tipo})
            //Response to "server"
            res.status(201).json({message: "New pokemon added to the pokedex!!"})    
    }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
})

//Function to get the first 40 pokemons
async function firstForty(url){
    let cont = 0
    let next=url
    let firsthundred=[]
    let aux=[]
    let fromAPI=[]
    while(cont < 2){
        fromAPI = await axios.get(next)
        aux= fromAPI.data.results.map((p)=>{ return p})
        firsthundred = [...firsthundred,...aux]
        next = fromAPI.data.next
        cont++
    }
    return firsthundred
}

//Function first letter to uppercase
function firstToUppercase(string1){
    return string1[0].toUpperCase()+string1.slice(1)
}

//Function to struct the pokemons data
async function structPokemon(pokemons){
    let pokeInfo=[]
    for (let i = 0; i < pokemons.length; i++) {
        pokeInfo.push(await axios.get(pokemons[i].url))
        
    }
    return pokeInfo.map((p)=>{
        return {id:p.data.id, origin:"API",name: firstToUppercase(p.data.name), hp: p.data.stats[0].base_stat, attack: p.data.stats[1].base_stat, defense: p.data.stats[2].base_stat, speed: p.data.stats[5].base_stat, height: p.data.height, weight: p.data.weight,ptypes: p.data.types, img_front: p.data.sprites.front_default, img_back: p.data.sprites.back_default}
    })
}
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
            const pokeApi = await structPokemon(await firstForty('https://pokeapi.co/api/v2/pokemon'))
            //Query to DB
            const pokedb = await Pokemon.findAll({include:Tipo})
            //Structuring DB results in case there any at the DB
            const dbresults= pokedb?pokedb.map((p)=>{ return {id:p.dataValues.id,origin:"DB",name: firstToUppercase(p.dataValues.name), hp: p.dataValues.hp, attack: p.dataValues.attack, defense: p.dataValues.defense, speed: p.dataValues.speed, height: p.dataValues.height, weight: p.dataValues.weight,ptypes: p.dataValues.tipos, img_front: p.dataValues.img_front, img_back: p.dataValues.img_back }}):[]
            //Concatenating the results from API and DB
            const result = dbresults.length?[...pokeApi, ...dbresults]:[...pokeApi]
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
                Object.assign(resultname,{id:pokeApi.data.id,origin:"API",name: firstToUppercase(pokeApi.data.name), hp: pokeApi.data.stats[0].base_stat, attack: pokeApi.data.stats[1].base_stat, defense: pokeApi.data.stats[2].base_stat, speed: pokeApi.data.stats[5].base_stat, height: pokeApi.data.height, weight: pokeApi.data.weight,ptypes: pokeApi.data.types, img_front: pokeApi.data.sprites.front_default, img_back: pokeApi.data.sprites.back_default})
            }else{
                //When the result comes from DB
                const tipos= pokedb.tipos.map((t)=>{return {id:t.dataValues.id, name: t.dataValues.name}})
                console.log(pokedb.dataValues)
                Object.assign(resultname ,{id:pokedb.dataValues.id,origin:"DB",name: firstToUppercase( pokedb.dataValues.name), hp: pokedb.dataValues.hp, attack: pokedb.dataValues.attack, defense: pokedb.dataValues.defense, speed: pokedb.dataValues.speed, height: pokedb.dataValues.height, weight: pokedb.dataValues.weight,ptypes: tipos, img_front: pokedb.dataValues.img_front, img_back: pokedb.dataValues.img_back })
            }
            //Response to "server"
            res.status(200).json(resultname)
        }    
    } catch (error) {
        res.status(404).json({error: error.message, message: `Pokemon's name '${name}' do not exist`})
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
            Object.assign(resultid,{id:pokeApi.data.id,origin:"API",name: firstToUppercase( pokeApi.data.name), hp: pokeApi.data.stats[0].base_stat, attack: pokeApi.data.stats[1].base_stat, defense: pokeApi.data.stats[2].base_stat, speed: pokeApi.data.stats[5].base_stat, height: pokeApi.data.height, weight: pokeApi.data.weight,ptypes: pokeApi.data.types, img_front: pokeApi.data.sprites.front_default, img_back: pokeApi.data.sprites.back_default})
        }
        else{
            //When it comes as an UUID
            //Query to DB
            const pokedb = await Pokemon.findOne({where:{id:id}, include:Tipo})
            //Structuring types
            const tipos= pokedb.tipos.map((t)=>{return {id:t.dataValues.id, name: t.dataValues.name}})
            console.log(tipos);
            console.log(pokedb.dataValues)
            Object.assign(resultid ,{id:pokedb.dataValues.id,origin:"DB",name: firstToUppercase( pokedb.dataValues.name), hp: pokedb.dataValues.hp, attack: pokedb.dataValues.attack, defense: pokedb.dataValues.defense, speed: pokedb.dataValues.speed, height: pokedb.dataValues.height, weight: pokedb.dataValues.weight, ptypes: tipos, img_front: pokedb.dataValues.img_front, img_back: pokedb.dataValues.img_back })
        }
        //Response to "server"
        res.status(200).json(resultid)    
    } catch (error) {
        res.status(404).json({error:error.message})    
    }
    
})



module.exports = router