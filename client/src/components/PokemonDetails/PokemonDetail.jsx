import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonById } from '../../actions/index.js'
import NotFound from "../NotFound/NotFound";
import "./PokemonDetail.css"
import "../TypeStyles/style.css"

function PokemonDetail({id}){
    
    const dispatch = useDispatch()
    const pokemon = useSelector((state) => state.searchPokemonById)
    useEffect(()=>{
        dispatch(getPokemonById(id))
    }, []);// eslint-disable-next-line
    console.log(pokemon);
    return(
        
        <div className="full">
            <div className="info">
                <div className="image">
                    {pokemon.img_front === null || !pokemon.img_front ?
                    <NotFound image={"noimage"}/>
                : <img src={pokemon.img_front} alt={pokemon.name}/>}
                <div className="details">
                    <h1>{pokemon.name}</h1>
                    <div className="detail">
                        <h4 className="hp">&#9829; Health Points: {pokemon.hp}</h4>
                        <h4 className="attack">&#x2694; Attack: {pokemon.attack}</h4>
                        <h4 className="defense">&#9960; Defense: {pokemon.defense}</h4>
                        <h4 className="speed">&#9889; Speed: {pokemon.speed}</h4>
                    </div>
                    <div className="bodyinfo">
                        <h4 className="height">&#128207; Height: {pokemon.height}</h4>
                        <h4 className="weight">&#9878; Weight: {pokemon.weight}</h4>
                    </div>
                    <div className="dtypes">
                        <h4>Types: </h4>
                        <div className="dtype">
                            {pokemon.ptypes?pokemon.ptypes.map((t)=> (
                                <div className={`icon ${t.hasOwnProperty('type')?t.type.name:t.name}`}>
                                    <h6 > {t.hasOwnProperty('type')?t.type.name:t.name} </h6>
                                </div>
                                )):null                     
                            }
                        </div>
                    </div>
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