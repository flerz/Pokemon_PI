import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonById } from '../../actions/index.js'
import NotFound from "../NotFound/NotFound";

function PokemonDetail({id}){
    
    const dispatch = useDispatch()
    const pokemon = useSelector((state) => state.searchPokemonById)
    useEffect(()=>{
        dispatch(getPokemonById(id))
    }, []);// eslint-disable-next-line
    return(
        
        <div className="full">
            <div className="info">
                <div className="image">
                    {pokemon.img_front === null || !pokemon.img_front ?
                    <NotFound image={"noimage"}/>
                : <img src={pokemon.img_front} alt={pokemon.name}/>}
                <div>
                    <h1>{pokemon.name}</h1>
                    <h4>Health Points: {pokemon.hp}</h4>
                    <h4>Attack: {pokemon.attack}</h4>
                    <h4>Defense: {pokemon.defense}</h4>
                    <h4>Speed: {pokemon.speed}</h4>
                    <h4>Height: {pokemon.height}</h4>
                    <h4>Weight: {pokemon.weight}</h4>
                    <h4>Types: </h4>
                    {pokemon.ptypes?pokemon.ptypes.map((t)=> (
                        <h6>{t.type.name}</h6>
                    )):null                       
                    }
                </div>
                </div>
            </div>
            <Link to="/home">
                <button className="button" type="submit"> Go Back </button>
            </Link>
        </div>
    )
}

export default PokemonDetail