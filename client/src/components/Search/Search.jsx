import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchPokemons } from "../../actions/index.js";
import NotFound from "../NotFound/NotFound.jsx";
import '../PokemonDetails/PokemonDetail.css'

function Search(){
    const dispatch= useDispatch()
    let { name }= useParams()

    const searchPokemon = useSelector((state) => state.searchPokemonByName)
    useEffect(()=> {
        dispatch(searchPokemons(name.toLowerCase()))
    },[name])

    return (
        <div className="full">
        <div className="info">
                <div className="image">
                    {searchPokemon.img_front === null || !searchPokemon.img_front ?
                    <NotFound image={"noimage"}/>
                : <img src={searchPokemon.img_front} alt={searchPokemon.name}/>}
                <div className="details">
                    <h1>{searchPokemon.name}</h1>
                    <div className="detail">
                        <h4 className="hp">&#9829; Health Points: {searchPokemon.hp}</h4>
                        <h4 className="attack">&#x2694; Attack: {searchPokemon.attack}</h4>
                        <h4 className="defense">&#9960; Defense: {searchPokemon.defense}</h4>
                        <h4 className="speed">&#9889; Speed: {searchPokemon.speed}</h4>
                    </div>
                    <div className="bodyinfo">
                        <h4 className="height">&#128207; Height: {searchPokemon.height}</h4>
                        <h4 className="weight">&#9878; Weight: {searchPokemon.weight}</h4>
                    </div>
                    <div className="dtypes">
                        <h4>Types: </h4>
                        <div className="dtype">
                            {searchPokemon.ptypes?searchPokemon.ptypes.map((t)=> (
                                <div className={`icon ${t.hasOwnProperty('type')?t.type.name:t.name}`}>
                                    <h6 > {t.hasOwnProperty('type')?t.type.name:t.name} </h6>
                                </div>
                                )):null                     
                            }
                        </div>
                    </div>                </div>
                </div>
            </div>
            <Link to="/home">
                <button className="button" type="submit"> Go Back </button>
            </Link>
    </div>
    )
}

export default Search